# Polyglot gateway (Python) — also runs the PHP and Java engines via subprocess.
import json, subprocess, os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs
PORT = int(os.environ.get("PORT", 8080))

def py_compute(n):
    f = 1
    for i in range(2, n+1): f *= i
    s = str(f)
    return {"lang": "Python", "what": f"{n}! (factorial)", "result": (s[:30]+"…") if len(s) > 30 else s}

class H(BaseHTTPRequestHandler):
    def _send(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers(); self.wfile.write(body)
    def log_message(self, *a): pass
    def do_OPTIONS(self):
        self.send_response(204); self.send_header("Access-Control-Allow-Origin","*"); self.send_header("Access-Control-Allow-Headers","*"); self.end_headers()
    def do_GET(self):
        u = urlparse(self.path); q = parse_qs(u.query); n = int(q.get("n", ["20"])[0])
        try:
            if u.path == "/api/python": self._send(py_compute(n))
            elif u.path == "/api/php":  self._send(json.loads(subprocess.check_output(["php","compute.php",str(n)])))
            elif u.path == "/api/java": self._send(json.loads(subprocess.check_output(["java","-cp",".","Compute",str(n)])))
            elif u.path in ("/","/api"): self._send({"ok":True,"endpoints":["/api/python","/api/php","/api/java"]})
            else: self._send({"error":"not found"}, 404)
        except Exception as e: self._send({"error": str(e)}, 500)

print(f"Polyglot backend on :{PORT}")
ThreadingHTTPServer(("0.0.0.0", PORT), H).serve_forever()
