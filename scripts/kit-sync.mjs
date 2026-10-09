// Vendors the kit into a site: node scripts/kit-sync.mjs --site htw|ioo-reader|ioo-main --dest <folder>   (writes kit.lock.json)
//                              node scripts/kit-sync.mjs --check --dest <folder>                           (fails when a file differs from the lock)
// Copies files only. No registry, no publishing, no network. In a site repo, <folder> is tools/_kit (HTW), app/tools/_kit (reader)
// or src/components/tools/_kit (main). CI runs --check so a hand edit of the vendored copy is caught.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'kit');
const PROFILES = {
  htw: { dirs: ['css', 'fonts', 'core', 'schema', 'check', 'contract', 'html'], files: ['VERSION', 'types.d.mts'], exclude: ['html/blocks.mjs.map'] },
  'ioo-reader': { dirs: ['css', 'fonts', 'core', 'schema', 'check', 'contract', 'html', 'react'], files: ['VERSION', 'types.d.mts'], exclude: ['html/shell.mjs', 'html/kit.js', 'html/h.mjs'] },
};
PROFILES['ioo-main'] = PROFILES['ioo-reader'];

const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

export function sync({ site, dest }) {
  const p = PROFILES[site];
  if (!p) throw new Error(`unknown site ${site}`);
  const version = fs.readFileSync(path.join(SRC, 'VERSION'), 'utf8').trim();
  fs.rmSync(dest, { recursive: true, force: true });
  const files = {};
  for (const rel of [...p.files, ...p.dirs.flatMap(d => walk(path.join(SRC, d)).map(f => path.relative(SRC, f)))]) {
    if (p.exclude.includes(rel)) continue;
    const to = path.join(dest, rel);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(path.join(SRC, rel), to);
    files[rel] = sha(to);
  }
  fs.writeFileSync(path.join(dest, 'kit.lock.json'), JSON.stringify({ kit: 'tools-kit', version, site, files }, null, 2) + '\n');
  return { version, count: Object.keys(files).length };
}

export function check(dest) {
  const lock = JSON.parse(fs.readFileSync(path.join(dest, 'kit.lock.json'), 'utf8'));
  const errs = [];
  for (const [rel, hash] of Object.entries(lock.files)) {
    const f = path.join(dest, rel);
    if (!fs.existsSync(f)) errs.push(`missing ${rel}`); else if (sha(f) !== hash) errs.push(`changed ${rel}`);
  }
  const have = walk(dest).map(f => path.relative(dest, f)).filter(r => r !== 'kit.lock.json');
  for (const r of have) if (!(r in lock.files)) errs.push(`extra ${r}`);
  return errs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const get = k => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : undefined; };
  const dest = get('--dest');
  if (!dest) { console.error('usage: kit-sync.mjs --site <htw|ioo-reader|ioo-main> --dest <folder> | --check --dest <folder>'); process.exit(2); }
  if (a.includes('--check')) { const e = check(path.resolve(dest)); if (e.length) { console.error(e.join('\n')); process.exit(1); } console.log('vendored kit matches kit.lock.json'); }
  else { const r = sync({ site: get('--site'), dest: path.resolve(dest) }); console.log(`synced kit ${r.version}: ${r.count} files to ${dest}`); }
}
