# Ortho Assess

Orthodontic case assessment that runs in the browser — one HTML file, no build step. Optional sync through the clinic server.

**Open it:** https://destiny4424-netizen.github.io/ortho-assess/ (later: https://ortho.handraldentistry.com)

## What it does
- Tabs for patient details, photographs, upper/lower 3D scans, lateral ceph and OPG — or drop a mixed
  batch on ⬆ Add files and it sorts them. Opens JPEG, HEIC (iPhone), PNG, TIFF, BMP, WebP, PDF and DICOM
  pictures, and STL/OBJ/PLY scans or a ZIP of them.
- Ceph: 25 landmarks placed by ✨ Auto-detect (Claude AI), by Quick place (3 taps on S, N, Me and an average
  skull), or by hand; drag any point and every value that depends on it updates live. Ruler, angle,
  magnifier, grid, calibration, brightness/contrast.
- Analyses: Steiner, Downs, Tweed, McNamara, Eastman, Jarabak/Björk, Ricketts (selected), soft tissue.
- 3D models: measure tooth widths for Bolton and space analysis. OPG: dental chart and findings.
- Diagnosis & plan: problem list, objectives and evidence-linked treatment options; Export PDF.
- Research: searches the published literature (Europe PMC) — only the search words are sent.

## Getting files in
- ⬆ Add files, drag-and-drop or paste — any format; the app sorts photos, X-rays and scans.
- **From WhatsApp:** on Android, install the app (Chrome ⋮ → Add to Home screen), then WhatsApp → Share →
  Ortho Assess (Web Share Target, `manifest.json` + `sw.js`; the service worker caches nothing). On iPhone,
  WhatsApp → Share → Save to Files, then ⬆ Add files. On a computer, drag from WhatsApp Web / Desktop.
- ✂️ Edit crops, rotates, straightens and flips photos, cephs and OPGs; ceph landmarks move with the picture.

## Privacy
Every record — details, photos, scans, X-rays — is kept in the browser on the device (IndexedDB).
**☁️ Sync (optional):** sign in with a clinic login and the cases are also kept on the clinic's own server
(`_clinic/server.py` in destiny4424-netizen/handraldentistry-website, `ortho.db` on the droplet), so every
phone and computer signed in with that login sees the same cases. Each login sees only its own cases.
Large files go up in 8 MB pieces; files are fetched on another device the first time they are opened.
Signed out, nothing is uploaded — except that ✨ Auto-detect / Auto-measure / Find the smile send the image
(no name or details) to Anthropic, using the Claude key you save in ⋯ → Claude AI key (kept only on that device).
Never commit patient photos, X-rays, scans, records, names or a Claude key to this public repository.
Use ⋯ → Export this case for a backup file, and ⋯ → Import to load it on another device.

Decision-support only: treatment decisions rest with the treating orthodontist.
