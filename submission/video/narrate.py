"""Kokoro narration, one clip per line of narration.json, plus public/durations.json.

    uv run --with kokoro-onnx --with soundfile python narrate.py MODELS_DIR
"""
import json
import sys
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

here = Path(__file__).resolve().parent
models = Path(sys.argv[1])
out = here / "public" / "audio"
out.mkdir(parents=True, exist_ok=True)
k = Kokoro(str(models / "kokoro-v1.0.onnx"), str(models / "voices-v1.0.bin"))
durations = []
for i, line in enumerate(json.loads((here / "narration.json").read_text(encoding="utf-8"))):
    samples, sr = k.create(line, voice="af_heart", speed=0.97, lang="en-us")
    sf.write(out / f"{i:02d}.wav", samples, sr)
    durations.append(round(len(samples) / sr, 3))
    print(i, durations[-1], line[:50])
(here / "src" / "durations.json").write_text(json.dumps(durations))
