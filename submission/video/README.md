# Demo video

`STORYBOARD.md` has the scenario and the shot list. The video is a Remotion project rendered on the Windows test PC.

```bash
uv run --python 3.12 --with kokoro-onnx --with soundfile python narrate.py MODELS_DIR   # narration clips and src/durations.json
npm install
npx remotion render src/index.ts Demo out/passport-demo.mp4 --codec h264 --crf 20
```

`MODELS_DIR` holds `kokoro-v1.0.onnx` and `voices-v1.0.bin`. Scene lengths follow the narration: each scene runs half a second before its line and about a second after. If Remotion can't download its own headless browser, add `--browser-executable` with the path to an installed Chrome.
