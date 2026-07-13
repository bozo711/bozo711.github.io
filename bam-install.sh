#!/bin/sh
# BAM — terminal edition. One-line install:
#   curl -fsSL https://bozo711.github.io/bam-install.sh | bash
# Installs the `bam` command: the same brain as the app, in your terminal.
set -e
SITE="https://bozo711.github.io"

command -v node >/dev/null 2>&1 || { echo "✕ BAM needs Node.js — install it first (brew install node, or nodejs.org)"; exit 1; }

echo "→ installing BAM terminal…"
mkdir -p "$HOME/.bam"
curl -fsSL "$SITE/jarvis.js"      -o "$HOME/.bam/jarvis.js"
curl -fsSL "$SITE/jarvis-core.js" -o "$HOME/.bam/jarvis-core.js"
chmod +x "$HOME/.bam/jarvis.js"

BIN="/usr/local/bin"
[ -w "$BIN" ] || { BIN="$HOME/.local/bin"; mkdir -p "$BIN"; }
printf '#!/bin/sh\nexec node "$HOME/.bam/jarvis.js" "$@"\n' > "$BIN/bam"
chmod +x "$BIN/bam"

echo "✓ installed → $BIN/bam"
case ":$PATH:" in
  *":$BIN:"*) ;;
  *) echo "⚠ add this to your shell profile:  export PATH=\"$BIN:\$PATH\"" ;;
esac
echo ""
echo "  Type:  bam"
echo ""
echo "  On your Mac it uses your existing keys automatically."
echo "  On any other machine, connect it to your Mac once:"
echo "    mkdir -p ~/.jarvis"
echo "    echo 'YOUR-VAULT-URL'   > ~/.jarvis/api-url     (from BAM → ⚙ Settings)"
echo "    echo 'YOUR-VAULT-TOKEN' > ~/.jarvis/api-token"
