# Anatomica

Clinical 3D anatomy for an MBBS intern: the whole body in layers, with clinical correlation and NEET PG high-yield notes on each structure. Runs in the browser on phone, iPad, Windows and Mac, and installs to the home screen.

## Use it

- **Male / Female** switch above the layers swaps in the female pelvis (bones, uterus and tubes, ovaries, vulva, bladder, rectum).
- **Layers** (left, or the strip under the top bar on a phone): tap to show or hide; hold to show only that layer.
- **Tap** a structure to open its card. **Double-tap** to zoom to it.
- **Turn**: drag (one finger on touch). The body turns around the point you grab.
- **Move**: right-drag or Shift-drag with a mouse, two-finger swipe on a trackpad, two fingers on a touch screen.
- **Zoom**: scroll wheel, trackpad pinch or finger pinch. It zooms toward the point under the cursor or between your fingers.
- **Search** (top bar, or ⌘K / Ctrl+K / `/`) across 3,169 structures.
- **X-ray** fades everything except the selection. **Section** cuts the body axially, sagittally or coronally.
- **Isolate** shows only the selected structure; **Show all** brings everything back.
- **Saved views** (bookmark icon) keep the angle, layers and selection.
- **Procedures** (dock): 13 bedside procedures. Each shows the target (amber), landmarks (teal) and structures at risk (red) on the model, with steps and common mistakes.
- **Revise** (dock): identify-the-structure questions and NEET PG style MCQs by region, with spaced repetition. Progress is kept on the device.

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
- `src/content/*.ts` — clinical and NEET PG notes by region, keyed by structure name. Muscle parts ("Long head of biceps brachii") share their muscle's entry automatically. These are drafts and should be checked against BD Chaurasia or Gray's.
- `src/content/procedures.ts` — procedure guides.
- `src/content/questions.ts` — MCQs.

### Rebuilding the models

```bash
cd tools && npm install
# convert each Z-Anatomy FBX with node_modules/fbx2gltf/bin/<OS>/FBX2glTF --binary into tools/raw/
node build-models.mjs raw ../public
node build-descriptions.mjs <Z-Anatomy>/Resources/Descriptions/OriginalDescriptions
node build-icons.mjs
node build-female.mjs <path to Sketchfab download>/scene.gltf   # female pelvis
```

## Credits

3D models and descriptions from [Z-Anatomy](https://github.com/LluisV/Z-Anatomy) (Gauthier Kervyn, Lluís Vinent), based on [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/desc.html) by the Database Center for Life Science. Licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); overview texts come from Wikipedia under CC BY-SA. Derived models in this repository are shared under the same license.

Female pelvis: "[Bony Pelvis and Pelvic Organs from MRI](https://sketchfab.com/3d-models/bony-pelvis-and-pelvic-organs-from-mri-ad38f2971a054b4db2cd05e3efce9c59)" by [audreybyrd](https://sketchfab.com/audreybyrd), licensed [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/); converted, scaled and positioned to fit the male skeleton.
