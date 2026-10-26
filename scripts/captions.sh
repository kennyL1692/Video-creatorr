#!/bin/sh
# Burn word-by-word captions onto a video with Remotion.
# Usage: scripts/captions.sh raw/clip.mp4 work/clip.json [seconds]
#   seconds  optional: render only the first N seconds (a preview)
set -e
video="$1"; transcript="$2"; seconds="$3"
[ -f "$video" ] && [ -f "$transcript" ] || { echo "Usage: $0 <video> <transcript.json> [seconds]"; exit 1; }
root="$(cd "$(dirname "$0")/.." && pwd)"
name="$(basename "${video%.*}")"

cp "$video" "$root/editor/public/input.mp4"
node -e '
const fs=require("fs");
const t=JSON.parse(fs.readFileSync(process.argv[1],"utf8"));
fs.writeFileSync(process.argv[2], JSON.stringify({videoSrc:"input.mp4", transcript:t}));
' "$transcript" "$root/work/$name.props.json"

if [ -n "$seconds" ]; then
  out="$root/work/$name.preview.mp4"
  frames="--frames=0-$((seconds * 30 - 1))"
else
  out="$root/out/$name.captioned.mp4"
  frames=""
fi

cd "$root/editor"
npx remotion render src/index.ts Captions "$out" --props="$root/work/$name.props.json" $frames
echo "Saved: $out"
