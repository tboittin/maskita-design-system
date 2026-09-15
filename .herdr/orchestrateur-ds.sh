#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# Orchestrateur pour maskita-design-system
# Wrapper autour de ~/.hermes/scripts/orchestrateur.py
# Usage : ./orchestrateur-ds.sh <commande> <plan.json>
# ─────────────────────────────────────────────────────────────
set -euo pipefail

ORCHESTRATEUR_REPO=/home/thomas/maskita-design-system \
ORCHESTRATEUR_VERIFIER="pnpm typecheck" \
exec python3 ~/.hermes/scripts/orchestrateur.py "$@"
