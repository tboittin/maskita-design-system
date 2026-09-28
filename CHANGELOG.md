# Changelog

## [1.3.0] — Accessibilité renforcée

### Nouvelles fonctionnalités
- **Tokens accessibilité** : contrat `data-accessibilite="renforcee"` avec surcontraste 7:1, typo +25%, focus 3px, animations désactivées
- **Interrupteur** : nouveau composant toggle avec `aria-pressed`, clavier Entrée/Espace
- **Onglets** : nouveau composant avec motif ARIA tabs (`tablist`, `tab`, `tabpanel`), navigation flèches

### Améliorations accessibilité
- **Bouton** : `aria-label` obligatoire (TS) si icône seule, tailles minimales (24/32/40px)
- **Modal** : `aria-labelledby` pointant sur le titre, `aria-describedby` sur le contenu, IDs uniques via `useId()`
- **Jalons** : `aria-label` localisable, `aria-disabled` sur étapes futures
- **PastilleStatut** : icônes distinctes par état, `aria-label` descriptif, libellé forcé en mode renforcé
- **Messages** : `role="status"` et `aria-live="polite"` sur MessageSucces et MessageInfo

### Tests
- **Playwright e2e** : 37 tests validant le comportement accessible des composants
- **Storybook** : stories pour tous les composants avec variantes accessibilité

### Technique
- Dépendance : `playwright` (dev, tests e2e)
