#!/usr/bin/env python3.11
"""Generate ORIGINAL cinematic visuals for a video — no stock, no membership, $0.

Pollinations (free, keyless) makes one image per search term, then ffmpeg's zoompan
gives each a slow "Ken Burns" push/pan so still images read as motion footage.
Drops <n>.mp4 clips into --out so make_video.py picks them up exactly like B-roll.

  python3.11 gen_visuals.py --out clips/ [--orientation landscape] money mindset city

Needs: imageio_ffmpeg (already used by make_video.py). Falls back gracefully:
a term that won't generate is skipped, and make_video handles an empty dir.
"""
import argparse, os, subprocess, sys, urllib.parse, random, imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
STYLE = ("cinematic, photorealistic, dramatic lighting, shallow depth of field, "
         "film grain, high detail, moody color grade, no text, no watermark")


def fetch(term, dest, w, h):
    # Pollinations is a free service with free-service uptime — try twice, new seed each time
    prompt = urllib.parse.quote(term.strip() + ", " + STYLE)
    for _ in range(2):
        url = ("https://image.pollinations.ai/prompt/%s?width=%d&height=%d&nologo=true&seed=%d"
               % (prompt, w, h, random.randint(1, 999999)))
        r = subprocess.run(["curl", "-s", "-L", "-m", "90", "-o", dest, url])
        if r.returncode == 0 and os.path.exists(dest) and os.path.getsize(dest) > 8000:
            return True
    return False


def kenburns(img, out, w, h, i):
    # scale up so the crop never hits an edge, then zoompan over ~3s at 30fps —
    # matched to the renderer's ~2.8s cut rhythm so every cut lands on fresh motion.
    # rotate through push-in / pull-out / lateral drifts so the reel breathes.
    frames = 96
    cx, cy = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"
    moves = [
        ("min(zoom+0.0026,1.25)", cx, cy),                                   # push in
        ("if(lte(zoom,1.0),1.25,max(1.001,zoom-0.0026))", cx, cy),           # pull out
        ("min(zoom+0.0018,1.22)", cx + "+(on/%d)*iw*0.04" % frames, cy),     # drift right
        ("min(zoom+0.0018,1.22)", cx + "-(on/%d)*iw*0.04" % frames, cy),     # drift left
    ]
    z, x, y = moves[i % len(moves)]
    vf = ("scale=%d:%d:force_original_aspect_ratio=increase,crop=%d:%d,"
          "zoompan=z='%s':d=%d:x='%s':y='%s':s=%dx%d:fps=30,"
          "format=yuv420p" % (int(w * 1.3), int(h * 1.3), int(w * 1.3), int(h * 1.3), z, frames, x, y, w, h))
    r = subprocess.run([FF, "-y", "-loop", "1", "-i", img, "-vf", vf, "-t", "3.2",
                        "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", out],
                       capture_output=True)
    return r.returncode == 0 and os.path.exists(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--orientation", default="landscape")
    ap.add_argument("terms", nargs="+")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    w, h = (1080, 1920) if a.orientation == "portrait" else (1920, 1080)
    made = 0
    for i, term in enumerate(a.terms[:12]):
        img = os.path.join(a.out, "img%d.jpg" % i)
        clip = os.path.join(a.out, "%d.mp4" % i)
        if not fetch(term, img, w, h):
            print("skip (no image):", term, file=sys.stderr); continue
        if kenburns(img, clip, w, h, i):
            made += 1; print("made clip for:", term)
        try: os.remove(img)
        except OSError: pass
    print("visuals:", made, "clips")
    sys.exit(0 if made else 1)


if __name__ == "__main__":
    main()
