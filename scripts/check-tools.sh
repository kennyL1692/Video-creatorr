#!/bin/sh
# Reports which video tools are ready. Installs nothing.
ok() { printf "OK       %s\n" "$1"; }
missing() { printf "MISSING  %s\n" "$1"; }
command -v ffmpeg >/dev/null && ok "ffmpeg: $(ffmpeg -version | head -1)" || missing ffmpeg
command -v node >/dev/null && ok "node $(node -v)" || missing node
command -v python3 >/dev/null && ok "$(python3 --version)" || missing python3
python3 -c "import faster_whisper" 2>/dev/null && ok "faster-whisper" || missing "faster-whisper (pip install faster-whisper)"
python3 -m yt_dlp --version >/dev/null 2>&1 && ok "yt-dlp $(python3 -m yt_dlp --version)" || missing "yt-dlp (pip install yt-dlp)"
