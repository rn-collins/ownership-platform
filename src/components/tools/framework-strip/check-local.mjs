// Local checks that the kit does not cover yet. The kit's validator looks for kit/schema/mechanics/<mechanic>-1.json, and the kit folder is
// not ours to edit, so this tool ships its own data schema (data.schema.json) and runs it here with the kit's own schema checker.
// The same file is used by the image checks: every photograph exists, has the size the spec says, and carries creator, licence and source.
import fs from 'node:fs';
import { validateSpec } from '../_kit/check/validate.mjs';
import { validateSchema } from '../_kit/check/schema-lite.mjs';

const read = (dir, name) => fs.readFileSync(new URL(name, dir), 'utf8');

/** validateSpec with the mechanic-data step swapped for this tool's own schema. */
export function validateTool(spec, dir, opts = {}) {
  const r = validateSpec(spec, opts);
  const schema = JSON.parse(read(dir, 'data.schema.json'));
  const errors = r.errors.filter(e => !/^data[:.\[]/.test(e) && !/^no data schema for mechanic/.test(e));
  errors.push(...validateSchema(spec.data, schema, schema, 'data'));
  return { ...r, errors };
}

/** Width and height of a JPEG from its start-of-frame marker. */
export function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

/** @returns {string[]} errors for every photograph in spec.data.images. imagesDir is where the files are served from (public/ in this repository). */
export function imageErrors(spec, dir, imagesDir = new URL('images/', dir)) {
  const errs = [];
  const seen = new Set();
  for (const img of spec.data.images) {
    if (seen.has(img.id)) errs.push(`duplicate image id ${img.id}`);
    seen.add(img.id);
    const url = new URL(img.file, imagesDir);
    if (!fs.existsSync(url)) { errs.push(`${img.id}: file images/${img.file} is missing`); continue; }
    const size = jpegSize(fs.readFileSync(url));
    if (!size) errs.push(`${img.id}: not a JPEG`);
    else if (size.width !== img.width || size.height !== img.height) errs.push(`${img.id}: file is ${size.width}x${size.height}, spec says ${img.width}x${img.height}`);
    if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(img.sourcePage)) errs.push(`${img.id}: source page is not a Commons file page`);
    if (img.licence !== 'Public domain' && !img.licenceUrl) errs.push(`${img.id}: licence ${img.licence} has no licence URL`);
    if (!/^(Illustrative photo|[A-Z])/.test(img.alt)) errs.push(`${img.id}: alt text looks wrong`);
  }
  return errs;
}

/** Every image id the data refers to must exist. */
export function referencedImageIds(node, out = new Set()) {
  if (Array.isArray(node)) node.forEach(x => referencedImageIds(x, out));
  else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) { if (/imageId$/i.test(k) && typeof v === 'string') out.add(v); else if (k !== 'images') referencedImageIds(v, out); }
  return out;
}
