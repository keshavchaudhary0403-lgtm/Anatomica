# Anatomica

Clinical 3D anatomy for an MBBS intern: the whole body in layers, with clinical correlation and NEET PG high-yield notes on each structure. Runs in the browser on phone, iPad, Windows and Mac, and installs to the home screen.

## Use it

- **Layers** (left, or the strip under the top bar on a phone): tap to show or hide; hold to show only that layer.
- **Tap** a structure to open its card. **Double-tap** to zoom to it.
- **Zoom** with the scroll wheel or a pinch: it zooms toward the point under the cursor or between your fingers.
- **Turn** by dragging (one finger on touch): the body turns around the point you grab. Drag empty space to turn around the last point you zoomed into.
- **Move** with right-drag, or two fingers on touch.
- **Search** (top bar, or ⌘K / Ctrl+K / `/`) across 3,169 structures.
- **X-ray** fades everything except the selection. **Section** cuts the body axially, sagittally or coronally.
- **Isolate** shows only the selected structure; **Show all** brings everything back.
- **Saved views** (bookmark icon) keep the angle, layers and selection.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

Deploy: import the repo in Vercel (framework preset: Vite). No server or keys needed.

## Content

- `public/models/*.glb` — one compressed model per system, built by `tools/build-models.mjs`.
- `public/data/structures.json` — every structure with its system, tissue, group and landmarks.
- `public/data/descriptions.json` — short overviews, built by `tools/build-descriptions.mjs`.
- `src/clinical.ts` — clinical, NEET PG and procedure notes. Add entries here, keyed by structure name. These are drafts and should be checked against BD Chaurasia or Gray's.

### Rebuilding the models

```bash
cd tools && npm install
# convert each Z-Anatomy FBX with node_modules/fbx2gltf/bin/<OS>/FBX2glTF --binary into tools/raw/
node build-models.mjs raw ../public
node build-descriptions.mjs <Z-Anatomy>/Resources/Descriptions/OriginalDescriptions
node build-icons.mjs
```

## Credits

3D models and descriptions from [Z-Anatomy](https://github.com/LluisV/Z-Anatomy) (Gauthier Kervyn, Lluís Vinent), based on [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/desc.html) by the Database Center for Life Science. Licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); overview texts come from Wikipedia under CC BY-SA. Derived models in this repository are shared under the same license.
