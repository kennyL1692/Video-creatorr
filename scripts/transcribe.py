#!/usr/bin/env python3
"""Transcribe a video/audio file with word-level timestamps.

Usage: python3 scripts/transcribe.py raw/clip.mp4 [model] [language]
  model     tiny | base | small | medium (default: small)
  language  e.g. en, ms, zh. Leave out to auto-detect.
Writes work/<name>.json and work/<name>.txt
"""
import json
import sys
from pathlib import Path

from faster_whisper import WhisperModel

src = Path(sys.argv[1])
model_name = sys.argv[2] if len(sys.argv) > 2 else "small"
language = sys.argv[3] if len(sys.argv) > 3 else None

model = WhisperModel(model_name, device="cpu", compute_type="int8")
segments, info = model.transcribe(str(src), language=language, word_timestamps=True)

out = {"language": info.language, "duration": info.duration, "segments": []}
lines = []
for seg in segments:
    out["segments"].append({
        "start": seg.start,
        "end": seg.end,
        "text": seg.text.strip(),
        "words": [{"word": w.word, "start": w.start, "end": w.end} for w in seg.words],
    })
    lines.append(seg.text.strip())

work = Path("work")
work.mkdir(exist_ok=True)
(work / f"{src.stem}.json").write_text(json.dumps(out, ensure_ascii=False, indent=2))
(work / f"{src.stem}.txt").write_text("\n".join(lines) + "\n")
print(f"Language: {info.language}. Wrote work/{src.stem}.json and work/{src.stem}.txt")
