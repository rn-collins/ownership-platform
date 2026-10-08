// node kit/check/cli.mjs --specs [root]   validate every spec.json under root (default: pilots/) with its sibling fixture and core.mjs
//                        --relations      validate pilots/relations.json against pilots/family-index.json
//                        --html <dir>     voice-lint every .html under dir
//                        --all            all of the above
// Exit code 1 on any error. This is the command a site's verify script calls.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { validateSpec } from './validate.mjs';
import { validateRelations } from '../core/related.mjs';
import { validateSchema } from './schema-lite.mjs';
import { lintFile, errorsOnly, format } from './voice-lint.mjs';

const kitRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const all = args.includes('--all');
let failed = 0;
const report = (label, errs, ok) => { if (errs.length) { failed++; console.error(`FAIL ${label}\n  ${errs.join('\n  ')}`); } else console.log(`ok   ${label}${ok ? ' ' + ok : ''}`); };
const walk = d => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => (e.isSymbolicLink() ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);

if (all || args.includes('--specs')) {
  const root = args[args.indexOf('--specs') + 1]?.startsWith('--') || !args[args.indexOf('--specs') + 1] ? path.join(kitRoot, 'pilots') : path.resolve(args[args.indexOf('--specs') + 1]);
  for (const f of walk(root).filter(f => path.basename(f) === 'spec.json')) {
    const dir = path.dirname(f);
    const spec = JSON.parse(fs.readFileSync(f, 'utf8'));
    const fx = fs.readdirSync(dir).find(n => n.endsWith('.fixture.txt'));
    const coreFile = path.join(dir, 'core.mjs');
    const derivations = fs.existsSync(coreFile) ? (await import(pathToFileURL(coreFile).href)).derivations : undefined;
    const r = validateSpec(spec, { storyText: fx ? fs.readFileSync(path.join(dir, fx), 'utf8') : undefined, derivations });
    report(path.relative(kitRoot, f), r.errors, `(${r.needsRn.length} held for RN, ${r.warnings.length} warnings)`);
  }
}
if (all || args.includes('--relations')) {
  const rel = JSON.parse(fs.readFileSync(path.join(kitRoot, 'pilots/relations.json'), 'utf8'));
  const idx = JSON.parse(fs.readFileSync(path.join(kitRoot, 'pilots/family-index.json'), 'utf8'));
  const schemaDir = path.join(kitRoot, 'kit/schema');
  const errs = [
    ...validateSchema(rel, JSON.parse(fs.readFileSync(path.join(schemaDir, 'relations-1.json'), 'utf8'))),
    ...validateSchema(idx, JSON.parse(fs.readFileSync(path.join(schemaDir, 'family-index-1.json'), 'utf8'))),
    ...validateRelations(rel.relations, idx),
  ];
  report('pilots/relations.json and family-index.json', errs, `(${rel.relations.filter(r => r.status === 'approved').length} approved, ${rel.relations.filter(r => r.status !== 'approved').length} held)`);
}
if (args.includes('--html') || all) {
  const dir = args.includes('--html') && args[args.indexOf('--html') + 1] && !args[args.indexOf('--html') + 1].startsWith('--') ? path.resolve(args[args.indexOf('--html') + 1]) : path.join(kitRoot, 'harness');
  const ex = ['Directive (EU) 2024/2831 of the European Parliament and of the Council of 23 October 2024 on improving working conditions in platform work (Text with EEA relevance)', 'Digital labour platforms: Number of platforms and workers', 'digital labour platforms', 'Digital Labour Platforms', 'Hawaii Revised Statutes'];
  const pages = walk(dir).filter(f => f.endsWith('.html') && !f.includes('vendor'));
  const errs = pages.flatMap(f => errorsOnly(lintFile(f, ex)).map(x => format([x]).replace(f, path.relative(kitRoot, f))));
  report(`voice lint on ${pages.length} harness pages`, errs);
}
if (!args.length) { console.error('usage: cli.mjs --specs [root] | --relations | --html [dir] | --all'); process.exit(2); }
process.exit(failed ? 1 : 0);
