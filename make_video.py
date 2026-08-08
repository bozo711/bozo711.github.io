#!/usr/bin/env python3.11
"""Ravenspire Keep — faceless video generator (free, local).

script text -> neural voiceover (edge-tts or Bam's clone) with WORD-LEVEL timing
-> karaoke captions (big, centered, gold word-highlight — shorts style)
-> assembled MP4: fast cuts (~2.8s) through the B-roll, hook title card that
disappears after ~3s, light color grade, auto music bed from ~/.jarvis/music.

Usage:
  python3.11 make_video.py --title "TITLE" --script-file script.txt --out out.mp4 \
      [--voice bam|en-US-ChristopherNeural] [--broll-dir clips/] [--music bg.mp3] [--vertical]

Needs (pip, python3.11): edge-tts, imageio-ffmpeg. Captions use the full ffmpeg
bundled by imageio-ffmpeg (the system ffmpeg here lacks libass).
"""
import argparse, asyncio, glob, json, os, random, re, shutil, subprocess, sys, tempfile
import urllib.request
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
FONTSDIR = "/System/Library/Fonts/Supplemental"
CLONE_URL = "http://127.0.0.1:8765/speak"      # Ravenspire daemon — Bam's cloned voice
FALLBACK_VOICE = "en-US-ChristopherNeural"
MUSIC_DIR = os.path.expanduser("~/.jarvis/music")
SEG = 2.8                                       # seconds per B-roll cut


# ── voiceover + word timings ─────────────────────────────────────────────────

def edge_words(script, voice, media, rate=0, pitch=0):
    """edge-tts with word boundaries: writes audio, returns [(start, dur, word)]."""
    import edge_tts

    async def run():
        words = []
        com = edge_tts.Communicate(script, voice, rate="%+d%%" % rate, pitch="%+dHz" % pitch,
                                   boundary="WordBoundary")
        with open(media, "wb") as f:
            async for ch in com.stream():
                if ch["type"] == "audio":
                    f.write(ch["data"])
                elif ch["type"] == "WordBoundary":
                    words.append((ch["offset"] / 1e7, ch["duration"] / 1e7, ch["text"]))
        return words

    words = asyncio.run(run())
    if not os.path.exists(media) or os.path.getsize(media) < 2048:
        raise RuntimeError("TTS produced no audio")     # a real exception so callers can fall back
    return words


def split_sentences(script):
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", script) if s.strip()]


def sentence_style(i, n, sent):
    """(rate%, pitchHz, pause-after-s) — a human doesn't read at one speed with no air.
    Hook and closer land slower; questions lift; punchlines get a beat to sink in."""
    nw = len(sent.split())
    if i == 0:
        rate = -6                      # the hook, deliberate
    elif i == n - 1:
        rate = -5                      # the closer
    elif nw <= 6:
        rate = -7                      # short punchline — hit it slow
    else:
        rate = random.choice([-1, 0, 2, 3])
    if re.search(r"\d", sent):
        rate -= 2                      # numbers need time to register
    rate += random.choice([-1, 0, 1])
    pitch = 5 if sent.rstrip().endswith("?") else random.choice([-2, 0, 2])
    if i == 0 or sent.rstrip().endswith(("?", "!")):
        pause = 0.55                   # let the hook / question hang
    elif nw <= 6:
        pause = 0.48
    else:
        pause = random.uniform(0.28, 0.38)
    return rate, pitch, pause


def trim_pcm(frames, sr, thresh=300, pad=0.06):
    """Strip edge-tts's own head/tail padding (keep `pad` s of air).
    Returns (trimmed bytes, seconds cut from the head)."""
    import array
    a = array.array("h")
    a.frombytes(frames)
    n = len(a)
    first = next((i for i, v in enumerate(a) if abs(v) > thresh), 0)
    last = next((i for i in range(n - 1, -1, -1) if abs(a[i]) > thresh), n - 1)
    s = max(0, first - int(pad * sr))
    e = min(n, last + int(pad * sr) + 1)
    return a[s:e].tobytes(), s / sr


def say_voiceover(script, out_wav, tmp):
    """Last-ditch offline narrator: macOS `say`. edge-tts is an unofficial
    endpoint that can vanish any day — a render should degrade, not die."""
    aiff = os.path.join(tmp, "say.aiff")
    r = subprocess.run(["/usr/bin/say", "-o", aiff, script], capture_output=True)
    if r.returncode != 0 or not os.path.exists(aiff):
        sys.exit("all TTS engines failed (edge-tts down, `say` failed)")
    subprocess.run([FF, "-y", "-i", aiff, "-ar", "24000", "-ac", "1", "-sample_fmt", "s16", out_wav],
                   capture_output=True)
    return naive_words(script, duration(out_wav))


def edge_voiceover(script, voice, out_wav, tmp):
    """Sentence-by-sentence narration with varied pace, pitch and real breath
    pauses, stitched into one wav. Returns words with global timings."""
    import wave
    sents = split_sentences(script)
    SR = 24000
    pcm = bytearray()
    words = []
    for i, s in enumerate(sents):
        rate, pitch, pause = sentence_style(i, len(sents), s)
        mp3 = os.path.join(tmp, "s%d.mp3" % i)
        try:
            ws = edge_words(s, voice, mp3, rate, pitch)
        except SystemExit:
            raise
        except Exception:
            ws = edge_words(s, voice, mp3)             # retry plain
        w16 = os.path.join(tmp, "s%d.wav" % i)
        subprocess.run([FF, "-y", "-i", mp3, "-ar", str(SR), "-ac", "1",
                        "-sample_fmt", "s16", w16], capture_output=True)
        with wave.open(w16) as wf:
            frames = wf.readframes(wf.getnframes())
        frames, lead = trim_pcm(frames, SR)
        t0 = len(pcm) / 2 / SR
        words += [(max(t0 + st - lead, t0), du, w) for st, du, w in ws]
        pcm += frames
        pcm += b"\x00" * (int((pause if i < len(sents) - 1 else 0.4) * SR) * 2)
    with wave.open(out_wav, "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(SR)
        out.writeframes(bytes(pcm))
    return words


def naive_words(script, dur):
    ws = script.split()
    per = dur / max(len(ws), 1)
    return [(i * per, per, w) for i, w in enumerate(ws)]


def tts_bam(script, media):
    """Narrate in Bam's cloned voice (XTTS daemon). Returns False if it's down."""
    try:
        req = urllib.request.Request(CLONE_URL, data=json.dumps({"text": script}).encode(),
                                     headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=1800) as r:
            wav = r.read()
        if len(wav) < 4096:
            return False
        with open(media, "wb") as f:
            f.write(wav)
        return True
    except Exception as e:
        print("· cloned voice unavailable (%s)" % e)
        return False


def duration(media):
    p = subprocess.run([FF, "-i", media], capture_output=True, text=True)
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", p.stderr)
    if not m:
        return 30.0
    h, mn, s = m.groups()
    return int(h) * 3600 + int(mn) * 60 + float(s)


# ── karaoke captions (ASS) ───────────────────────────────────────────────────

def group_words(words):
    """3-word caption cards; break early at punctuation or a speech gap."""
    cards, cur = [], []
    for i, (st, du, w) in enumerate(words):
        cur.append((st, du, w))
        gap = words[i + 1][0] - (st + du) if i + 1 < len(words) else 0
        if len(cur) >= 3 or re.search(r"[.!?,:;]$", w) or gap > 0.6:
            cards.append(cur)
            cur = []
    if cur:
        cards.append(cur)
    return cards


def ass_time(t):
    t = max(t, 0)
    return "%d:%02d:%05.2f" % (t // 3600, t // 60 % 60, t % 60)


def ass_esc(s):
    return re.sub(r"[{}\\]", "", s)


def wrap_title(t, width):
    out, line = [], ""
    for w in t.split():
        if line and len(line) + 1 + len(w) > width:
            out.append(line)
            line = w
        else:
            line = (line + " " + w).strip()
    if line:
        out.append(line)
    return "\\N".join(ass_esc(x) for x in out[:3])


def build_ass(words, title, W, H, vertical, path):
    cap_fs = 96 if vertical else 64
    title_fs = 84 if vertical else 60
    cap_mv = 700 if vertical else 130
    title_mv = 300 if vertical else 100
    hdr = """[Script Info]
ScriptType: v4.00+
PlayResX: %d
PlayResY: %d
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Arial Black,%d,&H0000D7FF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,6,0,2,60,60,%d,1
Style: Title,Arial Black,%d,&H00FFFFFF,&H00FFFFFF,&HA0000000,&HA0000000,0,0,0,0,100,100,0,0,3,14,0,8,70,70,%d,1

[Events]
Format: Layer, Start, End, Style, Text
""" % (W, H, cap_fs, cap_mv, title_fs, title_mv)
    ev = []
    if title:
        ev.append("Dialogue: 1,0:00:00.00,0:00:02.80,Title,{\\fad(120,200)}"
                  + wrap_title(title.upper(), 18 if vertical else 30))
    cards = group_words(words)
    for ci, card in enumerate(cards):
        start = card[0][0]
        # hold the card until the next one starts so text never flickers out
        end = cards[ci + 1][0][0] if ci + 1 < len(cards) else card[-1][0] + card[-1][1] + 0.4
        end = max(end, start + 0.35)
        parts = []
        for st, du, w in card:
            parts.append("{\\kf%d}%s" % (max(int(du * 100), 8), ass_esc(w.upper())))
        ev.append("Dialogue: 0,%s,%s,Cap,{\\fad(50,30)}%s"
                  % (ass_time(start), ass_time(end), " ".join(parts)))
    with open(path, "w", encoding="utf-8") as f:
        f.write(hdr + "\n".join(ev) + "\n")


# ── assembly ─────────────────────────────────────────────────────────────────

def pick_music(explicit):
    if explicit and os.path.exists(explicit):
        return explicit
    tracks = []
    for ext in ("mp3", "m4a", "wav", "aac"):
        tracks += glob.glob(os.path.join(MUSIC_DIR, "*." + ext))
    return random.choice(tracks) if tracks else None


def build(a):
    tmp = tempfile.mkdtemp(prefix="rvid_")
    script = open(a.script_file, encoding="utf-8").read().strip() if a.script_file else a.script
    if not script:
        sys.exit("empty script")
    script = re.sub(r"\s+", " ", script)

    voice = os.path.join(tmp, "voice.mp3")
    words = None
    if a.voice == "bam":
        print("· narrating in Bam's cloned voice")
        wav = os.path.join(tmp, "voice.wav")
        if tts_bam(script, wav):
            voice = wav
            # word timing: quick edge pass, stretched to the clone's real pace
            try:
                tmp_edge = os.path.join(tmp, "edge.mp3")
                words = edge_words(script, FALLBACK_VOICE, tmp_edge)
                ratio = duration(voice) / max(duration(tmp_edge), 0.1)
                words = [(st * ratio, du * ratio, w) for st, du, w in words]
                os.remove(tmp_edge)
            except Exception as e:
                print("· edge timing failed (%s) — even spacing" % e)
                words = naive_words(script, duration(voice))
        else:
            print("· falling back to", FALLBACK_VOICE)
            voice = os.path.join(tmp, "voice.wav")
            try:
                words = edge_voiceover(script, FALLBACK_VOICE, voice, tmp)
            except Exception as e:
                print("· edge-tts broken (%s) — macOS say" % e)
                words = say_voiceover(script, voice, tmp)
    else:
        print("· narrating with", a.voice)
        voice = os.path.join(tmp, "voice.wav")
        try:
            words = edge_voiceover(script, a.voice, voice, tmp)
        except Exception as e:
            print("· edge-tts broken (%s) — macOS say" % e)
            words = say_voiceover(script, voice, tmp)
    dur = duration(voice)
    print("· voiceover %.1fs, %d words" % (dur, len(words or [])))
    if not words:
        words = naive_words(script, dur)

    W, H = (1080, 1920) if a.vertical else (1920, 1080)
    build_ass(words, a.title, W, H, a.vertical, os.path.join(tmp, "cap.ass"))

    inputs, pre = [], []
    broll = sorted(glob.glob(os.path.join(a.broll_dir, "*.mp4"))) if a.broll_dir else []
    if broll:
        # fast cuts: a fresh clip every ~SEG seconds, cycling through the pool
        nseg = max(int(dur / SEG + 0.999), 1)
        for i in range(nseg):
            inputs += ["-stream_loop", "-1", "-t", "%.2f" % (SEG + 0.5), "-i", broll[i % len(broll)]]
        parts = ""
        for i in range(nseg):
            pre.append("[%d:v]scale=%d:%d:force_original_aspect_ratio=increase,crop=%d:%d,"
                       "setsar=1,fps=30,trim=duration=%.2f,setpts=PTS-STARTPTS[c%d]"
                       % (i, W, H, W, H, SEG, i))
            parts += "[c%d]" % i
        pre.append("%sconcat=n=%d:v=1:a=0,trim=duration=%.2f,setpts=PTS-STARTPTS[cc]" % (parts, nseg, dur))
        n_vid = nseg
    else:
        # clean animated gradient background (looks like a tasteful "lyric" video)
        inputs += ["-f", "lavfi", "-t", "%.2f" % dur,
                   "-i", "gradients=s=%dx%d:c0=0x0a0e18:c1=0x14304f:c2=0x0a0e18:nb_colors=3:seed=7:speed=0.015" % (W, H)]
        pre.append("[0:v]fps=30,setsar=1[cc]")
        n_vid = 1
    # light grade so mixed AI/stock footage reads as one video
    pre.append("[cc]eq=contrast=1.06:saturation=1.22,vignette=angle=PI/7[bg]")
    pre.append("[bg]subtitles=cap.ass:fontsdir=%s[v]" % FONTSDIR)

    inputs += ["-i", voice]
    voice_idx = n_vid
    music = pick_music(a.music)
    if music:
        print("· music bed:", os.path.basename(music))
        inputs += ["-stream_loop", "-1", "-i", music]
        afilter = ("[%d:a]dynaudnorm[vo];[%d:a]volume=0.12[bm];"
                   "[vo][bm]amix=inputs=2:duration=first:normalize=0:dropout_transition=0,"
                   "afade=t=out:st=%.2f:d=0.6[a]" % (voice_idx, voice_idx + 1, max(dur - 0.6, 0)))
    else:
        afilter = "[%d:a]dynaudnorm[a]" % voice_idx

    fc = ";".join(pre) + ";" + afilter
    cmd = [FF, "-y"] + inputs + ["-filter_complex", fc,
           "-map", "[v]", "-map", "[a]",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
           "-r", "30", "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
           "-shortest", os.path.abspath(a.out)]
    print("· rendering %dx%d, %d cuts ..." % (W, H, n_vid))
    p = subprocess.run(cmd, cwd=tmp, capture_output=True, text=True)
    shutil.rmtree(tmp, ignore_errors=True)
    if p.returncode != 0 or not os.path.exists(a.out):
        sys.exit("render failed:\n" + p.stderr[-1500:])
    sz = os.path.getsize(a.out)
    print("✓ wrote %s (%.1f MB, %.1fs)" % (a.out, sz / 1e6, dur))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--title", default="")
    ap.add_argument("--script")
    ap.add_argument("--script-file")
    ap.add_argument("--out", required=True)
    ap.add_argument("--voice", default="en-US-ChristopherNeural")
    ap.add_argument("--broll-dir")
    ap.add_argument("--music")
    ap.add_argument("--vertical", action="store_true")
    build(ap.parse_args())
