#!/usr/bin/env python3
"""PriceTag Gemini vision parser: shelf-tag image -> structured price/store/date."""
import os, base64, json, sys
from pathlib import Path

ENV_PATH = Path.home() / ".hermes" / ".env"

def load_key():
    for line in ENV_PATH.read_text().splitlines():
        if line.startswith("GEMINI_API_KEY="):
            return line.split("=", 1)[1].strip()
    return os.environ.get("GEMINI_API_KEY", "")

def encode_image(path: str) -> str:
    return base64.b64encode(Path(path).read_bytes()).decode()

def parse(image_path: str, api_key: str = None) -> dict:
    api_key = api_key or load_key()
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set (check .env or env)")
    import requests
    b64_img = encode_image(image_path)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{
            "parts": [
                {"text": "Return ONLY a JSON object with keys: price (number or string), store (string), product (string), date (YYYY-MM-DD from image or today if absent). No extra text."},
                {"inline_data": {"mime_type": "image/png", "data": b64_img}}
            ]
        }],
        "generationConfig": {"response_mime_type": "application/json"}
    }
    r = requests.post(url, headers={"Content-Type":"application/json"}, json=payload, timeout=60)
    r.raise_for_status()
    return json.loads(r.json()["candidates"][0]["content"]["parts"][0]["text"])

if __name__ == "__main__":
    img = sys.argv[1] if len(sys.argv) > 1 else "sample_tag.png"
    print(json.dumps(parse(img), indent=2))
