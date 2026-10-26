# Video-creatorr: rules for Claude

## Folders
- `raw/`   original videos. NEVER edit, move or delete anything here.
- `work/`  transcripts, cut files, previews. Safe to overwrite.
- `out/`   final exports only.
- `assets/` fonts, music (only music we have rights to), logo, brand file.
- `scripts/` helper scripts.

## Output rules
- Reels: 1080x1920, 30fps, H.264 MP4, AAC audio.
- Keep captions inside the safe zone (not in the bottom ~20% or the top ~10%).
- Fonts must support English, Malay and Chinese. Check before rendering.

## Workflow rules
1. Tell me before installing anything.
2. Always render a 10-second preview before a full render.
3. Change one thing at a time.
4. After rendering, check: length, resolution, audio level, caption typos. Report pass/fail.

## Standard steps
1. Transcribe: `python3 scripts/transcribe.py raw/<file>` (word-level JSON + txt in `work/`).
2. Cut silences and filler words using the transcript. List what was cut.
3. Captions (Remotion): word-by-word, highlight the spoken word.
4. Suggest 3 hooks for the first 3 seconds; wait for my choice.
5. Export to `out/`.

## Language
Speech is often mixed English + Malay (sometimes Chinese). Do not force one language.
Explain things in simple words.
