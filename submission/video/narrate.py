"""Kokoro narration: for each narration/<id>.json, one clip per line in public/audio/<id>/ and src/durations/<id>.json.

    uv run --python 3.12 --with kokoro-onnx --with soundfile python narrate.py MODELS_DIR [id ...]
"""
import json
import sys
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

here = Path(__file__).resolve().parent
models = Path(sys.argv[1])
ids = sys.argv[2:] or sorted(p.stem for p in (here / "narration").glob("*.json"))
k = Kokoro(str(models / "kokoro-v1.0.onnx"), str(models / "voices-v1.0.bin"))
for id in ids:
    out = here / "public" / "audio" / id
    out.mkdir(parents=True, exist_ok=True)
    durations = []
    for i, line in enumerate(json.loads((here / "narration" / f"{id}.json").read_text(encoding="utf-8"))):
        samples, sr = k.create(line, voice="af_heart", speed=0.97, lang="en-us")
        sf.write(out / f"{i:02d}.wav", samples, sr)
        durations.append(round(len(samples) / sr, 3))
        print(id, i, durations[-1], line[:50])
    (here / "src" / "durations" / f"{id}.json").write_text(json.dumps(durations))
