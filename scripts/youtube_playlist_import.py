import argparse
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path


USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)


def fetch_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8", "ignore")


def fetch_json(url: str, payload: dict):
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "User-Agent": USER_AGENT,
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8", "ignore"))


def extract_json_blob(html: str):
    patterns = [
        r"window\['ytInitialData'\]\s*=\s*JSON\.parse\((?P<blob>'(?:\\.|[^'])*')\);",
        r'window\["ytInitialData"\]\s*=\s*JSON\.parse\((?P<blob>\'(?:\\.|[^\'])*\')\);',
        r"var\s+ytInitialData\s*=\s*(?P<blob>\{.*?\});",
        r"window\['ytInitialData'\]\s*=\s*(?P<blob>\{.*?\});",
    ]

    for pattern in patterns:
        match = re.search(pattern, html, re.S)
        if not match:
            continue
        blob = match.group("blob")
        if blob.startswith("'"):
            return json.loads(json.loads(blob))
        return json.loads(blob)
    raise RuntimeError("Could not locate ytInitialData in the playlist HTML.")


def extract_string_after(html: str, marker: str) -> str:
    index = html.find(marker)
    if index < 0:
        return ""
    start = index + len(marker)
    end = start
    while end < len(html) and html[end] not in {'"', "'"}:
        end += 1
    return html[start:end]


def extract_balanced_object(html: str, marker: str):
    index = html.find(marker)
    if index < 0:
        return None
    start = html.find("{", index + len(marker))
    if start < 0:
        return None

    depth = 0
    in_string = False
    escaped = False
    quote_char = ""
    for position in range(start, len(html)):
        char = html[position]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote_char:
                in_string = False
        else:
            if char in {'"', "'"}:
                in_string = True
                quote_char = char
            elif char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                if depth == 0:
                    return json.loads(html[start : position + 1])
    return None


def text_of(value) -> str:
    if not value:
        return ""
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, dict):
        if "simpleText" in value:
            return str(value["simpleText"]).strip()
        if "runs" in value:
            return "".join(str(run.get("text", "")) for run in value["runs"]).strip()
    if isinstance(value, list):
        return "".join(text_of(item) for item in value).strip()
    return str(value).strip()


def playlist_index_of(renderer: dict, fallback: int) -> int:
    candidates = [
        renderer.get("index"),
        renderer.get("indexText"),
        renderer.get("videoIndex"),
    ]
    for candidate in candidates:
        raw = text_of(candidate)
        if raw.isdigit():
            return int(raw)
    return fallback


def duration_of(renderer: dict) -> str:
    for key in ("lengthText", "thumbnailOverlays"):
        value = renderer.get(key)
        if key == "lengthText":
            label = text_of(value)
            if label:
                return label
        if key == "thumbnailOverlays" and isinstance(value, list):
            for overlay in value:
                status = overlay.get("thumbnailOverlayTimeStatusRenderer") or {}
                label = text_of(status.get("text"))
                if label:
                    return label
    return ""


def title_of(renderer: dict) -> str:
    for key in ("title", "headline", "videoTitle"):
        label = text_of(renderer.get(key))
        if label:
            return label
    return "[Untitled video]"


def collect_renderers(data):
    stack = [data]
    while stack:
        current = stack.pop()
        if isinstance(current, dict):
            for key, value in current.items():
                if key.endswith("Renderer") and isinstance(value, dict):
                    yield key, value
                stack.append(value)
        elif isinstance(current, list):
            stack.extend(reversed(current))


def collect_playlist_items(data):
    items = []
    seen_ids = set()
    fallback_index = 1
    allowed = {
        "playlistVideoRenderer",
        "playlistPanelVideoRenderer",
        "videoRenderer",
        "compactVideoRenderer",
        "videoWithContextRenderer",
    }

    for key, renderer in collect_renderers(data):
        if key not in allowed:
            continue
        video_id = renderer.get("videoId")
        if not video_id or video_id in seen_ids:
            continue

        seen_ids.add(video_id)
        items.append(
            {
                "index": playlist_index_of(renderer, fallback_index),
                "youtubeId": video_id,
                "duration": duration_of(renderer) or "Private",
                "sourceTitle": title_of(renderer),
            }
        )
        fallback_index += 1

    items.sort(key=lambda item: (item["index"], item["youtubeId"]))
    return items


def collect_continuation_tokens(data):
    tokens = []
    stack = [data]
    while stack:
        current = stack.pop()
        if isinstance(current, dict):
            command = current.get("continuationCommand")
            if isinstance(command, dict) and command.get("token"):
                tokens.append(command["token"])
            stack.extend(current.values())
        elif isinstance(current, list):
            stack.extend(reversed(current))
    return tokens


def merge_items(*groups):
    merged = []
    seen = set()
    for group in groups:
        for item in group:
            if item["youtubeId"] in seen:
                continue
            seen.add(item["youtubeId"])
            merged.append(item)
    merged.sort(key=lambda item: (item["index"], item["youtubeId"]))
    return merged


def load_playlist_payload(playlist_url: str):
    html = fetch_html(playlist_url)
    data = extract_json_blob(html)
    api_key = extract_string_after(html, '"INNERTUBE_API_KEY":"')
    context = extract_balanced_object(html, '"INNERTUBE_CONTEXT":')
    return html, data, api_key, context


def fetch_all_playlist_items(playlist_url: str):
    _, data, api_key, context = load_playlist_payload(playlist_url)
    items = collect_playlist_items(data)

    if not api_key or not context:
        return items

    queue = []
    seen_tokens = set()
    for token in collect_continuation_tokens(data):
        if token not in seen_tokens:
            queue.append(token)
            seen_tokens.add(token)

    while queue:
        token = queue.pop(0)
        response = fetch_json(
            f"https://www.youtube.com/youtubei/v1/browse?key={api_key}",
            {"context": context, "continuation": token},
        )
        items = merge_items(items, collect_playlist_items(response))
        for next_token in collect_continuation_tokens(response):
            if next_token not in seen_tokens:
                queue.append(next_token)
                seen_tokens.add(next_token)

    return items


def js_value(value) -> str:
    return json.dumps(value, ensure_ascii=False)


def to_js_module(const_prefix: str, playlist_id: str, items: list[dict]) -> str:
    lines = [
        f'export const {const_prefix}_PLAYLIST_ID = "{playlist_id}";',
        "",
        f"export const {const_prefix}_PLAYLIST_ITEMS = [",
    ]
    for item in items:
        lines.append(
            "  { "
            f'index: {item["index"]}, '
            f'youtubeId: {js_value(item["youtubeId"])}, '
            f'duration: {js_value(item["duration"])}, '
            f'sourceTitle: {js_value(item["sourceTitle"])} '
            "},"
        )
    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Fetch and convert a YouTube playlist into a JS data module.")
    parser.add_argument("playlist_url")
    parser.add_argument("--const-prefix", required=True)
    parser.add_argument("--out", type=Path)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    playlist_id = urllib.parse.parse_qs(urllib.parse.urlparse(args.playlist_url).query).get("list", [""])[0]
    if not playlist_id:
        raise SystemExit("Playlist URL must include a list= query parameter.")

    items = fetch_all_playlist_items(args.playlist_url)

    if args.json:
        payload = {"playlistId": playlist_id, "count": len(items), "items": items}
        text = json.dumps(payload, ensure_ascii=False, indent=2)
    else:
        text = to_js_module(args.const_prefix, playlist_id, items)

    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(text, encoding="utf-8")
    else:
        sys.stdout.write(text)


if __name__ == "__main__":
    main()
