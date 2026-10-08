// A small JSON Schema checker (no dependencies). Supports the subset the kit's schemas use:
// $ref (local), const, enum, type, required, properties, additionalProperties:false, items, minItems, maxItems,
// minLength, maxLength, minimum, maximum, pattern, anyOf. Anything else in a schema is ignored (descriptions, titles).
const typeOf = v => (v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v);
const isType = (v, t) => (t === 'number' ? typeof v === 'number' : t === 'integer' ? Number.isInteger(v) : typeOf(v) === t);

export function validateSchema(value, schema, root = schema, path = '') {
  const errs = [];
  const at = path || '(root)';
  if (schema.$ref) {
    const target = schema.$ref.replace(/^#\//, '').split('/').reduce((o, k) => o && o[k], root);
    if (!target) return [`${at}: unresolved $ref ${schema.$ref}`];
    return validateSchema(value, target, root, path);
  }
  if (schema.anyOf) {
    const results = schema.anyOf.map(s => validateSchema(value, s, root, path));
    if (!results.some(r => r.length === 0)) errs.push(`${at}: matches none of the allowed shapes (${results.map(r => r[0]).join(' | ')})`);
    return errs;
  }
  if ('const' in schema && value !== schema.const) errs.push(`${at}: must be ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.includes(value)) errs.push(`${at}: must be one of ${schema.enum.map(x => JSON.stringify(x)).join(', ')} (got ${JSON.stringify(value)})`);
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some(t => isType(value, t))) { errs.push(`${at}: must be ${types.join(' or ')} (got ${typeOf(value)})`); return errs; }
  }
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && [...value].length < schema.minLength) errs.push(`${at}: shorter than ${schema.minLength} characters`);
    if (schema.maxLength !== undefined && [...value].length > schema.maxLength) errs.push(`${at}: longer than ${schema.maxLength} characters (${[...value].length})`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errs.push(`${at}: does not match ${schema.pattern}`);
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) errs.push(`${at}: below ${schema.minimum}`);
    if (schema.maximum !== undefined && value > schema.maximum) errs.push(`${at}: above ${schema.maximum}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errs.push(`${at}: needs at least ${schema.minItems} items`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errs.push(`${at}: allows at most ${schema.maxItems} items`);
    if (schema.items) value.forEach((v, i) => errs.push(...validateSchema(v, schema.items, root, `${path}[${i}]`)));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const k of schema.required || []) if (!(k in value)) errs.push(`${at}: missing required field "${k}"`);
    const props = schema.properties || {};
    for (const [k, v] of Object.entries(value)) {
      if (props[k]) errs.push(...validateSchema(v, props[k], root, path ? `${path}.${k}` : k));
      else if (schema.additionalProperties === false) errs.push(`${at}: unknown field "${k}"`);
    }
  }
  return errs;
}
