#!/usr/bin/env python3.11
"""Upload a video to YouTube (resumable, OAuth). Reads yt_client_id /
yt_client_secret / yt_refresh_token from ~/.jarvis/config.json. Uses curl for
HTTPS. Refreshes an access token, then resumable-uploads the MP4.

  python3.11 upload_youtube.py --file out.mp4 --title "T" [--desc-file d.txt] \
      [--tags "a,b,c"] [--privacy private|unlisted|public] [--category 22]

Prints the watch URL on success. Run yt_oauth.py ONCE first.
"""
import argparse, json, os, subprocess, sys, tempfile

CFG = os.path.expanduser("~/.jarvis/config.json")
TOKEN_URL = "https://oauth2.googleapis.com/token"
UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status"


def cfg_get(k):
    try:
        r=subprocess.run(["security","find-generic-password","-s","jarvis-keys","-a",k,"-w"],capture_output=True,text=True)
        if r.returncode==0 and r.stdout.strip(): return r.stdout.strip()
    except Exception: pass
    try: return (json.load(open(CFG)).get(k, "") or "")
    except Exception: return ""


def access_token(cid, secret, refresh):
    p = subprocess.run(["curl", "-s", "-L", "-X", "POST", TOKEN_URL,
        "-d", "client_id=" + cid, "-d", "client_secret=" + secret,
        "-d", "refresh_token=" + refresh, "-d", "grant_type=refresh_token"],
        capture_output=True, text=True)
    try: d = json.loads(p.stdout)
    except Exception: sys.exit("token refresh: bad response: " + p.stdout[-400:])
    if "access_token" not in d:
        if d.get("error") == "invalid_grant":
            sys.exit("YouTube refresh token EXPIRED (Google kills them every 7 days while the "
                     "OAuth app is in Testing mode). Fix: python3.11 yt_oauth.py  — and to stop "
                     "this recurring, set the app to 'In production' in Google Cloud Console → "
                     "OAuth consent screen.")
        sys.exit("token refresh failed: " + json.dumps(d)[-400:])
    return d["access_token"]


def start_resumable(token, meta, size):
    mf = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False)
    json.dump(meta, mf); mf.close()
    p = subprocess.run(["curl", "-s", "-D", "-", "-o", "/dev/null", "-X", "POST", UPLOAD_URL,
        "-H", "Authorization: Bearer " + token,
        "-H", "Content-Type: application/json; charset=UTF-8",
        "-H", "X-Upload-Content-Type: video/*",
        "-H", "X-Upload-Content-Length: %d" % size,
        "--data-binary", "@" + mf.name], capture_output=True, text=True)
    os.unlink(mf.name)
    for line in p.stdout.splitlines():
        if line.lower().startswith("location:"):
            return line.split(":", 1)[1].strip()
    sys.exit("could not start upload (no session URL):\n" + p.stdout[-600:])


def put_file(session_url, path, token):
    p = subprocess.run(["curl", "-s", "-X", "PUT", session_url,
        "-H", "Authorization: Bearer " + token, "-H", "Content-Type: video/*",
        "--upload-file", path], capture_output=True, text=True)
    try: return json.loads(p.stdout)
    except Exception: sys.exit("upload response not JSON: " + p.stdout[-600:])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--desc"); ap.add_argument("--desc-file")
    ap.add_argument("--tags", default="")
    ap.add_argument("--privacy", default="private", choices=["private", "unlisted", "public"])
    ap.add_argument("--category", default="22")
    a = ap.parse_args()
    if not os.path.exists(a.file): sys.exit("no such file: " + a.file)
    cid, secret, refresh = cfg_get("yt_client_id"), cfg_get("yt_client_secret"), cfg_get("yt_refresh_token")
    if not (cid and secret and refresh):
        sys.exit("YouTube upload not connected — set yt_client_id/secret and run yt_oauth.py.")
    desc = open(a.desc_file, encoding="utf-8").read() if a.desc_file else (a.desc or "")
    meta = {"snippet": {"title": a.title[:100], "description": desc[:5000],
            "tags": [t.strip() for t in a.tags.split(",") if t.strip()], "categoryId": a.category},
            "status": {"privacyStatus": a.privacy, "selfDeclaredMadeForKids": False}}
    size = os.path.getsize(a.file)
    print("· refreshing access token")
    token = access_token(cid, secret, refresh)
    print("· resumable upload (%.1f MB)" % (size / 1e6))
    session = start_resumable(token, meta, size)
    print("· uploading …")
    res = put_file(session, a.file, token)
    vid = res.get("id")
    if not vid: sys.exit("upload failed: " + json.dumps(res)[-600:])
    print("✓ uploaded:", "https://youtu.be/" + vid, "(" + a.privacy + ")")
    print("https://youtu.be/" + vid)


if __name__ == "__main__":
    main()
