#!/bin/sh
# Virtual screen, a window manager, a password-protected VNC view of it, then the agent.
set -e
: "${VNC_PASSWORD:?set VNC_PASSWORD: the browser view can hold your logged-in sessions}"
Xvfb :99 -screen 0 1440x900x24 -nolisten tcp &
sleep 1
fluxbox >/dev/null 2>&1 &
x11vnc -display :99 -forever -shared -localhost -rfbport 5900 -passwd "$VNC_PASSWORD" -quiet &
websockify --web /usr/share/novnc 6080 localhost:5900 >/dev/null 2>&1 &
exec python /app/agent.py
