# Demo video

One Remotion template, `src/Demo.tsx`, and one story per traveller in `src/stories/`, each taken from a real eval run. `STORYBOARD.md` is Maria's shot list; `storyboards/` has the others. The narration for each story is in `narration/<id>.json`.

```bash
uv run --python 3.12 --with kokoro-onnx --with soundfile python narrate.py MODELS_DIR [id ...]   # clips in public/audio/<id>/, lengths in src/durations/<id>.json
npm install
npx remotion render src/index.ts maria out/maria.mp4 --codec h264 --crf 20
```

`MODELS_DIR` holds `kokoro-v1.0.onnx` and `voices-v1.0.bin`. Scene lengths follow the narration: each scene runs half a second before its line and about a second after. If Remotion can't download its own headless browser, add `--browser-executable` with the path to an installed Chrome.
