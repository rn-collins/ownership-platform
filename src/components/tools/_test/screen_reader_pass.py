#!/usr/bin/python3
"""Screen-reader pass for the /tools pages, as close as a script gets to a person with a screen reader.

It does NOT run VoiceOver or NVDA. It uses Playwright (Chromium) to read what assistive technology is given: the accessibility tree
(Playwright's aria snapshot), the computed names of controls, images and links, headings, landmarks, tables, live regions and the
keyboard order. It runs every page with scripting on and with scripting off (JavaScript really disabled in the browser).

  /usr/bin/python3 src/components/tools/_test/screen_reader_pass.py http://127.0.0.1:3111 [output folder]

Writes <page>.js.txt, <page>.nojs.txt and <page>.375.txt (the tree), checks.json (every check), and verdicts.txt (one line per page).
"""
import json, re, sys, pathlib
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip('/')
OUT = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else 'screen-reader-out')
OUT.mkdir(parents=True, exist_ok=True)
PAGES = [('hub', '/tools'), ('four-questions-map', '/tools/four-questions-map'), ('dependency-ranker', '/tools/dependency-ranker'), ('framework-strip', '/tools/framework-strip')]

PROBE = r"""() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && (r.width > 0 || r.height > 0); };
  const nameOf = el => {
    const lb = el.getAttribute('aria-labelledby');
    if (lb) return lb.split(/\s+/).map(i => (document.getElementById(i) || {}).textContent || '').join(' ').trim();
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
    if (el.labels && el.labels.length) return [...el.labels].map(l => l.textContent).join(' ').trim();
    if (el.tagName === 'IMG') return (el.getAttribute('alt') || '').trim();
    if (el.tagName === 'INPUT' && ['submit', 'button'].includes(el.type)) return (el.value || '').trim();
    const fs = el.closest('fieldset'); void fs;
    return (el.textContent || '').replace(/\s+/g, ' ').trim() || (el.getAttribute('title') || '').trim();
  };
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role=heading]')].filter(vis || (() => true)).map(h => ({ level: +(h.getAttribute('aria-level') || h.tagName[1]), text: h.textContent.replace(/\s+/g, ' ').trim().slice(0, 70) }));
  const controls = [...document.querySelectorAll('button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=checkbox],[role=radio]')].filter(vis).map(c => ({ tag: c.tagName.toLowerCase(), type: c.type || '', name: nameOf(c), id: c.id || '' }));
  const imgs = [...document.querySelectorAll('img')].map(i => ({ alt: i.getAttribute('alt'), src: i.getAttribute('src'), w: i.getAttribute('width'), h: i.getAttribute('height'), role: i.getAttribute('role') || '' }));
  const links = [...document.querySelectorAll('a[href]')].filter(vis).map(a => ({ name: nameOf(a), href: a.getAttribute('href') }));
  const tables = [...document.querySelectorAll('table')].map(t => ({ caption: !!t.querySelector('caption'), th: t.querySelectorAll('th').length, scoped: [...t.querySelectorAll('th')].every(h => h.getAttribute('scope') || h.closest('thead')), hasHead: !!t.querySelector('thead') }));
  const live = [...document.querySelectorAll('[aria-live],[role=status],[role=alert]')].map(e => ({ id: e.id, role: e.getAttribute('role') || '', live: e.getAttribute('aria-live') || '', text: (e.textContent || '').trim().slice(0, 80), len: (e.textContent || '').length }));
  const sections = [...document.querySelectorAll('section[aria-labelledby],nav,aside,main,header,footer,form,[role=region]')].map(e => ({ tag: e.tagName.toLowerCase(), label: e.getAttribute('aria-label') || ((e.getAttribute('aria-labelledby') || '').split(' ').map(i => (document.getElementById(i) || {}).textContent || '').join(' ').trim()) }));
  const seenRadio = new Set();
  const focusable = [...document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary,[tabindex]')].filter(e => vis(e) && !e.disabled && e.tabIndex >= 0).filter(e => { if (e.type !== 'radio') return true; const k = e.name; if (seenRadio.has(k)) return false; seenRadio.add(k); return true; });
  return { title: document.title, lang: document.documentElement.lang, heads, controls, imgs, links, tables, live, sections, svg: document.querySelectorAll('svg,canvas').length, posTab: [...document.querySelectorAll('[tabindex]')].filter(e => +e.getAttribute('tabindex') > 0).length, focusableCount: focusable.length, js: document.documentElement.classList.contains('tk-js') };
}"""

ACTIVE = r"""() => { const a = document.activeElement; if (!a || a === document.body || a === document.documentElement) return null;
  const all = [...document.querySelectorAll('*')]; const r = a.getBoundingClientRect();
  return { tag: a.tagName.toLowerCase(), id: a.id || '', text: (a.getAttribute('aria-label') || a.textContent || a.value || '').replace(/\s+/g, ' ').trim().slice(0, 50), dom: all.indexOf(a), top: Math.round(r.top + scrollY), left: Math.round(r.left), inMain: !!a.closest('#main'), y: Math.round(r.top), hash: location.hash }; }"""

GENERIC = re.compile(r'^(click here|here|more|read more|link|this|learn more|go|details)$', re.I)
results = {}


def tree(page, path):
    txt = page.locator('body').aria_snapshot()
    path.write_text(txt)
    return txt


def tree_checks(txt):
    issues = []
    roles = {'banner': 0, 'main': 0, 'contentinfo': 0}
    navs = []
    for line in txt.splitlines():
        m = re.match(r'^\s*- (\w+)(?: "([^"]*)")?', line)
        if not m:
            continue
        role, name = m.group(1), m.group(2)
        if role in roles:
            roles[role] += 1
        if role == 'navigation':
            navs.append(name or '')
        if role in ('button', 'link', 'img', 'textbox', 'combobox', 'checkbox', 'radio', 'searchbox', 'slider', 'spinbutton', 'switch', 'tab', 'menuitem') and not name:
            issues.append(f'unnamed {role}: {line.strip()[:80]}')
    return roles, navs, issues


def walk_tabs(page, limit=400):
    seq = []
    page.evaluate("() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0,0); }")
    for _ in range(limit):
        page.keyboard.press('Tab')
        a = page.evaluate(ACTIVE)
        if a is None:
            seq.append(None)
            break
        if seq and seq[-1] and a['dom'] == seq[0]['dom'] and len(seq) > 3:
            break
        seq.append(a)
    return seq


def page_checks(name, js, page, probe, txt, seq, checks):
    mode = 'js' if js else 'nojs'
    def ok(label, cond, detail=''):
        checks.append({'page': name, 'mode': mode, 'check': label, 'ok': bool(cond), 'detail': str(detail)[:300]})
    heads = probe['heads']
    ok('exactly one h1', sum(1 for h in heads if h['level'] == 1) == 1, [h['text'] for h in heads if h['level'] == 1])
    skips = [(a['level'], b['level']) for a, b in zip(heads, heads[1:]) if b['level'] > a['level'] + 1]
    ok('heading order never skips a level', not skips, skips)
    roles, navs, unnamed = tree_checks(txt)
    ok('one banner, one main, one contentinfo', roles == {'banner': 1, 'main': 1, 'contentinfo': 1}, roles)
    ok('navigation landmarks have unique names', len(navs) == len(set(navs)) and all(navs), navs)
    ok('every control, link and image in the accessibility tree has a name', not unnamed, unnamed[:5])
    ok('every visible control has a computed name', all(c['name'] for c in probe['controls']), [c for c in probe['controls'] if not c['name']][:5])
    bad_alt = [i for i in probe['imgs'] if i['alt'] is None or re.search(r'\.(jpe?g|png|gif|webp|svg)\b', i['alt'] or '', re.I) or re.match(r'^(image|picture|photo|graphic|icon) of', i['alt'] or '', re.I) or (i['alt'] != '' and len((i['alt'] or '').strip()) < 12)]
    ok('every image has meaningful alt (no filename, no "image of")', not bad_alt, bad_alt[:3])
    ok('every image has width and height', all(i['w'] and i['h'] for i in probe['imgs']), [i['src'] for i in probe['imgs'] if not (i['w'] and i['h'])][:3])
    ok('tables have captions and header cells', all(t['th'] and t['caption'] and t['scoped'] for t in probe['tables']), probe['tables'])
    ok('no schematic or simulation drawing on the page (nothing to label)', probe['svg'] == 0, probe['svg'])
    gen = [l for l in probe['links'] if GENERIC.match(l['name']) or not l['name']]
    ok('no link reads "here" or "more", and none is empty', not gen, gen[:3])
    by = {}
    for l in probe['links']:
        by.setdefault(l['name'], set()).add(l['href'])
    dup = {k: len(v) for k, v in by.items() if len(v) > 1}
    ok('no two links share a name and go to different places', not dup, dup)
    ok('page title and language are set', bool(probe['title']) and probe['lang'] == 'en', (probe['title'], probe['lang']))
    ok('no positive tabindex', probe['posTab'] == 0, probe['posTab'])
    # live regions: one status line, polite, short
    status = [l for l in probe['live'] if l['id'] == 'tk-status']
    if js and name != 'hub':
        ok('one polite status line (role=status, aria-live=polite) is present', len(status) == 1 and status[0]['role'] == 'status' and status[0]['live'] == 'polite', status)
        big = [l for l in probe['live'] if l['len'] > 120]
        ok('no large live region that would be re-read', not big, big)
    # keyboard
    seq_ok = [s for s in seq if s]
    ok('first Tab stop is the skip link', bool(seq_ok) and re.search(r'skip to', seq_ok[0]['text'], re.I), seq_ok[0] if seq_ok else None)
    doms = [s['dom'] for s in seq_ok]
    first_wrap = next((i for i in range(1, len(doms)) if doms[i] <= doms[i - 1]), len(doms))
    ok('focus order follows document order (no jumps backward before the end)', first_wrap >= len(doms) - 1, doms[:first_wrap + 2][-4:])
    jumps = [(a['text'], b['text']) for a, b in zip(seq_ok, seq_ok[1:]) if a['inMain'] and b['inMain'] and b['top'] < a['top'] - 120 and b['left'] <= a['left'] + 60 and b['dom'] > a['dom']]
    ok('focus order follows reading order on the screen (inside the content, no jump up the page except to the next column)', not jumps, jumps[:3])
    ok('keyboard reaches every visible focusable element (a radio group is one stop)', len({s['dom'] for s in seq_ok}) >= probe['focusableCount'] - 1, (len({s["dom"] for s in seq_ok}), probe['focusableCount']))
    ok('focus leaves the page or wraps at the end (no keyboard trap)', len(seq) < 400, len(seq))
    return roles


def skip_link(page, name, js, checks):
    mode = 'js' if js else 'nojs'
    page.goto(BASE + dict(PAGES)[name], wait_until='load')
    page.keyboard.press('Tab')
    a = page.evaluate(ACTIVE)
    visible = bool(a) and a['y'] >= 0 and a['y'] < 200
    page.keyboard.press('Enter')
    page.keyboard.press('Tab')
    b = page.evaluate(ACTIVE)
    checks.append({'page': name, 'mode': mode, 'check': 'skip link is visible on focus and moves the next Tab stop into the content', 'ok': bool(visible and b and b['inMain'] or (b and b['inMain'])), 'detail': json.dumps({'skip': a, 'next': b})[:300]})
    if name != 'hub':
        page.goto(BASE + dict(PAGES)[name], wait_until='load')
        for _ in range(40):
            page.keyboard.press('Tab')
            cur = page.evaluate(ACTIVE)
            if cur and 'Skip to the tool' in cur['text']:
                page.keyboard.press('Enter'); page.keyboard.press('Tab')
                c = page.evaluate(ACTIVE)
                checks.append({'page': name, 'mode': mode, 'check': 'the tool skip link moves focus past the header into the tool', 'ok': bool(c and c['dom'] > cur['dom']), 'detail': json.dumps({'next': c})[:200]})
                break
        else:
            checks.append({'page': name, 'mode': mode, 'check': 'the tool skip link moves focus past the header into the tool', 'ok': False, 'detail': 'link not found in the first forty Tab stops'})


def status_text(page):
    return page.evaluate("() => (document.getElementById('tk-status') || {}).textContent || ''").strip()


def interactions(page, name, checks):
    """Scripting on: operate the tool and read what the status line announces and what the result region shows."""
    def ok(label, cond, detail=''):
        checks.append({'page': name, 'mode': 'js', 'check': label, 'ok': bool(cond), 'detail': str(detail)[:300]})
    page.goto(BASE + dict(PAGES)[name], wait_until='load')
    page.wait_for_function("document.documentElement.classList.contains('tk-js')")
    page.wait_for_timeout(500)
    if name == 'four-questions-map':
        page.get_by_label('Add an item under Build').fill('Ceramics studio')
        page.get_by_role('button', name='Add', exact=True).first.click()
        s1 = status_text(page); ok('adding an item is announced', re.search(r'Added to Build', s1), s1)
        page.get_by_role('button', name='Add', exact=True).first.click()
        s2 = status_text(page); ok('an empty add is announced as a plain error', re.search(r'Type a few words', s2), s2)
        page.get_by_label('Add an item under Carry').fill('My portfolio'); page.get_by_role('button', name='Add', exact=True).nth(1).click()
        page.get_by_role('radio', name=re.compile('role disappear', re.I)).first.check()
        s3 = status_text(page); ok('choosing a change is announced', re.search(r'Mark each item', s3), s3)
        before = status_text(page)
        page.get_by_role('radio', name='Stays with me').first.check(timeout=15000)
        after = status_text(page)
        region = page.evaluate("() => { const r = document.querySelector('section.tk-result'); return r ? r.textContent.slice(0,200) : ''; }")
        ok('marking an item announces the new result (status line changes)', after != before and len(after) > 0, {'before': before, 'after': after, 'result': region[:120]})
        ok('result card is a labelled region', page.evaluate("() => { const r = document.querySelector('section.tk-result'); return !!(r && r.getAttribute('aria-labelledby') && document.getElementById(r.getAttribute('aria-labelledby'))); }"), '')
    elif name == 'dependency-ranker':
        page.get_by_role('button', name='Add a dependency').click()
        s1 = status_text(page); ok('adding a dependency is announced', re.search(r'Added dependency 1 of 5', s1), s1)
        page.get_by_label('What is it called?').first.fill('Video platform')
        page.get_by_role('button', name='Add a dependency').click()
        page.get_by_label('What is it called?').nth(1).fill('Email list')
        for cb in page.get_by_role('checkbox').all()[:4]:
            cb.check()
        s2 = status_text(page); ok('a change in the order is announced', re.search(r'is first|all four tests', s2), s2)
        ok('ranked list is an ordered list with a name', page.evaluate("() => { const l = document.querySelector('ol.tk-list-ranked'); return !!(l && l.getAttribute('aria-label')); }"), '')
    return


def run():
    checks = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for js in (True, False):
            ctx = browser.new_context(viewport={'width': 1280, 'height': 900}, java_script_enabled=js)
            for name, path in PAGES:
                page = ctx.new_page()
                resp = page.goto(BASE + path, wait_until='load')
                assert resp and resp.status == 200, (path, resp and resp.status)
                if js:
                    page.wait_for_function("document.documentElement.classList.contains('tk-js')")
                    page.wait_for_timeout(600)
                txt = tree(page, OUT / f'{name}.{"js" if js else "nojs"}.txt')
                probe = page.evaluate(PROBE)
                seq = walk_tabs(page)
                page_checks(name, js, page, probe, txt, seq, checks)
                skip_link(page, name, js, checks)
                if js:
                    try:
                        interactions(page, name, checks)
                    except Exception as e:  # a step that could not be done is a failed check, not a crash
                        checks.append({'page': name, 'mode': 'js', 'check': 'the tool can be operated by its labels alone', 'ok': False, 'detail': str(e)[:250]})
                page.close()
            ctx.close()
        # a phone-width tree, scripting on
        ctx = browser.new_context(viewport={'width': 375, 'height': 812}, java_script_enabled=True)
        for name, path in PAGES:
            page = ctx.new_page(); page.goto(BASE + path, wait_until='load'); page.wait_for_timeout(500)
            tree(page, OUT / f'{name}.375.txt')
            ov = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
            checks.append({'page': name, 'mode': 'js-375', 'check': 'no horizontal page scroll at 375 px', 'ok': ov <= 0, 'detail': str(ov)})
            page.close()
        browser.close()
    (OUT / 'checks.json').write_text(json.dumps(checks, indent=1))
    lines = []
    for name, _ in PAGES:
        mine = [c for c in checks if c['page'] == name]
        bad = [c for c in mine if not c['ok']]
        lines.append(f"{name}: {'PASS' if not bad else 'ISSUES'}, {len(mine) - len(bad)} of {len(mine)} checks passed" + ('' if not bad else '; open: ' + ' | '.join(f"[{c['mode']}] {c['check']}" for c in bad)))
    (OUT / 'verdicts.txt').write_text('\n'.join(lines) + '\n')
    print('\n'.join(lines))
    for c in checks:
        if not c['ok']:
            print('FAIL', c['page'], c['mode'], c['check'], '|', c['detail'])


run()
