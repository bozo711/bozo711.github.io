#!/usr/bin/env python3.11
"""Download free B-roll clips for the video pipeline (Pexels, Pixabay backup).
Reads `pexels` / `pixabay` keys from ~/.jarvis/config.json. Downloads via curl.

  python3.11 get_broll.py --out clips/ [--orientation landscape] money saving budget
"""
import argparse, json, os, subprocess, sys, urllib.parse

CFG = os.path.expanduser("~/.jarvis/config.json")


def cfg_get(k):
    try:
        r=subprocess.run(["security","find-generic-password","-s","jarvis-keys","-a",k,"-w"],capture_output=True,text=True)
        if r.returncode==0 and r.stdout.strip(): return r.stdout.strip()
    except Exception: pass
    try: return (json.load(open(CFG)).get(k, "") or "")
    except Exception: return ""


def curl_json(url, headers=None):
    cmd = ["curl", "-s", "-L"]
    for h in (headers or []): cmd += ["-H", h]
    cmd.append(url)
    try: return json.loads(subprocess.run(cmd, capture_output=True, text=True).stdout)
    except Exception: return None


def curl_download(url, dest):
    subprocess.run(["curl", "-s", "-L", "-o", dest, url])
    return os.path.exists(dest) and os.path.getsize(dest) > 20000


def pexels(kw, orient, key):
    d = curl_json("https://api.pexels.com/videos/search?query=%s&per_page=5&orientation=%s&size=medium"
                  % (urllib.parse.quote(kw), orient), ["Authorization: " + key])
    if not d or not d.get("videos"): return None
    for v in d["videos"]:
        files = [f for f in v.get("video_files", []) if f.get("file_type") == "video/mp4"]
        files.sort(key=lambda f: (f.get("width") or 0))
        pick = next((f for f in files if (f.get("width") or 0) >= 1280), files[-1] if files else None)
        if pick: return pick["link"]
    return None


def pixabay(kw, key):
    d = curl_json("https://pixabay.com/api/videos/?key=%s&q=%s&per_page=5" % (key, urllib.parse.quote(kw)))
    if not d or not d.get("hits"): return None
    vids = d["hits"][0].get("videos", {})
    return (vids.get("medium") or vids.get("large") or vids.get("small") or {}).get("url")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--orientation", default="landscape")
    ap.add_argument("keywords", nargs="+")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    pk, xk = cfg_get("pexels"), cfg_get("pixabay")
    if not pk and not xk:
        sys.exit("no Pexels/Pixabay key — set one:  /set pexels <key>  (free at pexels.com/api)")
    got = 0
    for i, kw in enumerate(a.keywords):
        link = (pexels(kw, a.orientation, pk) if pk else None) or (pixabay(kw, xk) if xk else None)
        if not link: print("· no clip for:", kw); continue
        dest = os.path.join(a.out, "clip_%02d.mp4" % i)
        if curl_download(link, dest): print("✓ %s → %s" % (kw, os.path.basename(dest))); got += 1
        else: print("· download failed:", kw)
    print("got %d clip(s) → %s" % (got, a.out))
    sys.exit(0 if got else 2)


if __name__ == "__main__":
    main()
