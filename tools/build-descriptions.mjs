// Builds public/data/descriptions.json from Z-Anatomy's description texts (Wikipedia extracts, CC BY-SA).
// Usage: node build-descriptions.mjs <OriginalDescriptions dir>
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
const names = new Set(JSON.parse(fs.readFileSync(new URL('../public/data/structures.json', import.meta.url))).map((s) => s.name.toLowerCase()));
const out = {};
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.txt')) continue;
  const key = f.slice(0, -4).replace(/^\(|\)$/g, '').toLowerCase();
  if (!names.has(key)) continue;
  const raw = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r/g, '');
  const url = (raw.match(/https?:\/\/\S+/g) || []).pop() || '';
  const body = raw.replace(/https?:\/\/\S+/g, '').split(/\n\s*==/)[0];
  const paras = body.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p && p !== p.toUpperCase())
    .map((p) => p.replace(/\(\s*[,;]\s*/g, '(').replace(/\s*[,;]\s*\)/g, ')').replace(/\(\s*\)/g, '').replace(/\s+([,.)])/g, '$1').replace(/ {2,}/g, ' '));
  let text = ''; let n = 0;
  for (const p of paras) { if (n >= 3 || text.length > 700) break; text += (text ? '\n\n' : '') + p; n++; }
  if (text) out[key] = { t: text, u: url };
}
fs.writeFileSync(new URL('../public/data/descriptions.json', import.meta.url), JSON.stringify(out));
console.log(Object.keys(out).length, 'descriptions for', names.size, 'unique structure names');
