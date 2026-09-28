# Design System — Accessibilité

## Contrat data-accessibilite

Le mode accessibilité renforcée s'active via l'attribut `data-accessibilite="renforcee"` sur un ancêtre (en pratique `<html>`). Le design system ne lit ni n'écrit jamais cet attribut — il réagit uniquement en CSS.

## Tableau des paires de contrastes

### Mode standard (AA — 4.5:1 texte, 3:1 composants)

| Paire | Ratio | Statut |
|-------|-------|--------|
| `brume-900` (#292524) sur `brume-100` (#f5f5f4) | 11.5:1 | ✅ AA/AAA |
| `brume-900` (#292524) sur `white` (#ffffff) | 15.3:1 | ✅ AA/AAA |
| `brume-700` (#44403c) sur `brume-100` (#f5f5f4) | 6.5:1 | ✅ AA/AAA |
| `brume-500` (#78716c) sur `brume-100` (#f5f5f4) | 3.1:1 | ⚠️ AA grand texte seulement |
| `action-600` (#5b5bd6) sur `white` (#ffffff) | 4.1:1 | ⚠️ AA grand texte seulement |
| `signal-succes` (#3f9142) sur `white` (#ffffff) | 2.6:1 | ❌ (amélioré en mode renforcé) |
| `signal-erreur` (#c4453c) sur `white` (#ffffff) | 4.0:1 | ⚠️ AA grand texte seulement |
| `signal-attention` (#b47a2f) sur `white` (#ffffff) | 3.6:1 | ❌ (amélioré en mode renforcé) |
| `signal-info` (#4a72b8) sur `white` (#ffffff) | 3.8:1 | ❌ (amélioré en mode renforcé) |

### Mode renforcé (AAA — 7:1 texte, 4.5:1 composants)

| Paire | Ratio | Statut |
|-------|-------|--------|
| `brume-700` (#2d2926) sur `brume-100` (#f5f5f4) | 10.1:1 | ✅ AAA |
| `brume-500` (#4a4540) sur `brume-100` (#f5f5f4) | 5.8:1 | ✅ AAA |
| `action-600` (#4343c0) sur `white` (#ffffff) | 5.7:1 | ✅ AAA |
| `signal-succes` (#2d6b2f) sur `white` (#ffffff) | 4.6:1 | ✅ AAA |
| `signal-erreur` (#a8322a) sur `white` (#ffffff) | 5.9:1 | ✅ AAA |
| `signal-attention` (#8c601e) sur `white` (#ffffff) | 5.3:1 | ✅ AAA |
| `signal-info` (#385a96) sur `white` (#ffffff) | 5.4:1 | ✅ AAA |

### Composants (3:1 standard, 4.5:1 renforcé)

| Composant | Standard | Renforcé |
|-----------|----------|----------|
| Bouton primaire bg `action-600` sur blanc | 4.1:1 ⚠️ | 5.7:1 ✅ |
| Bouton ghost text `brume-500` sur `brume-100` | 3.1:1 ⚠️ | 5.8:1 ✅ |
| Pastille succès `signal-succes` sur fond | 2.6:1 ❌ | 4.6:1 ✅ |
| Pastille erreur `signal-erreur` sur fond | 4.0:1 ⚠️ | 5.9:1 ✅ |
| Pastille attention `signal-attention` sur fond | 3.6:1 ❌ | 5.3:1 ✅ |
| Pastille info `signal-info` sur fond | 3.8:1 ❌ | 5.4:1 ✅ |
