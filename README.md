## Package npm

Le design system est publiable comme package npm (`maskita-design-system`).

### Build du package

```bash
pnpm build:lib   # tsup (ESM+CJS+types) puis vite (dist/style.css self-hosted)
npm pack         # génère maskita-design-system-1.0.0.tgz
```

`dist/` contient :
- `index.js` (ESM) + `index.cjs` (CJS) + `index.d.ts` / `index.d.cts` (types)
- `style.css` — feuille autonome : tokens Tailwind v4 compilés, utilitaires
  des composants, polices woff2 embarquées en base64 (zéro requête réseau)

### Consommation

```bash
npm install maskita-design-system
```

```tsx
import { Bouton, Panneau, PastilleStatut } from 'maskita-design-system'
import 'maskita-design-system/style.css' // style.css toujours importé

<Bouton variante="primaire">Valider</Bouton>
```

React 18 est en `peerDependencies` : le package n'embarque pas son propre
React. Les `@fontsource/*` restent des dépendances (mais les polices sont
déjà embarquées dans style.css).

### Publication

```bash
npm login
npm publish --access public
```

Le nom `maskita-design-system` est libre sur npm (vérifié). `prepack` et
`prepublishOnly` déclenchent automatiquement `pnpm build:lib`.

### Test local (vérifié le 2026-09-08)

Un consommateur de test (`consumer-test/`, gitignoré) installe le `.tgz`,
importe composants + style.css, et passe : CJS require (25 exports), types TS,
rendu spotlight (Bouton #5b5bd6, rayon 8px, Inter, JetBrains Mono sur les
tags, modale ouvrable/fermable à l'Escape), zéro erreur console.

## Vérification