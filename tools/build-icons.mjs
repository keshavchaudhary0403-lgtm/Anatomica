// Renders public/favicon.svg into every icon size the app needs.
// Usage (from tools/): node build-icons.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'node:fs';

const pub = new URL('../public/', import.meta.url);
const svg = fs.readFileSync(new URL('favicon.svg', pub), 'utf8');

// Full-bleed square (no rounded corners) for iOS, which applies its own mask.
const square = svg.replace(/rx="15"/, 'rx="0"');
// Maskable: art shrunk into the central safe zone on a full-bleed background.
const inner = svg.replace(/^[\s\S]*?<rect[^>]*\/>/, '').replace(/<\/svg>\s*$/, '');
const defs = svg.match(/<defs>[\s\S]*?<\/defs>/)[0];
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${defs}<rect width="64" height="64" fill="url(#g)"/><g transform="translate(32 32) scale(0.7) translate(-32 -32)">${inner}</g></svg>`;

const out = async (src, size, name) => sharp(Buffer.from(src), { density: 600 }).resize(size, size).png().toFile(new URL(name, pub).pathname);
await out(svg, 192, 'icon-192.png');
await out(svg, 512, 'icon-512.png');
await out(maskable, 512, 'icon-maskable-512.png');
await out(square, 180, 'apple-touch-icon.png');
await out(svg, 150, 'mstile-150.png');
const sizes = [16, 32, 48];
const bufs = await Promise.all(sizes.map((s) => sharp(Buffer.from(svg), { density: 600 }).resize(s, s).png().toBuffer()));
fs.writeFileSync(new URL('favicon.ico', pub), await pngToIco(bufs));
console.log('icons written');
