# Maskita — Design System « Le Voile léger »

Design system du projet Maskita (pseudonymisation 100 % navigateur), généré
depuis [DESIGNSYSTEM.md](./DESIGNSYSTEM.md) : tokens, composants, démo et
Storybook.

**Le logo : la brochette.** *Maskita* signifie « brochette » en malgache —
un fil qui enfile trois morceaux de données, du plus gros au plus fin.
Même métaphore que le « fil » du parcours (Déposer → Vérifier → Récupérer).

## Stack

- React 18 + TypeScript strict
- Tailwind CSS v4 (`@theme` dans `src/index.css` — pas de tailwind.config.js)
- Storybook 8.6 (fondations, UI, patterns)

## Commandes

```bash
pnpm dev              # Storybook sur http://localhost:6006 (page de dev)
                      # + la démo buildée sur http://localhost:6006/demo/index.html
                      #   (rebuild automatique à chaque changement — watcher)
pnpm dev:demo         # la démo seule avec HMR sur http://localhost:5173
pnpm build            # build de la démo (dist/)
pnpm build:demo       # build de la démo pour /demo (.storybook/public/demo)
pnpm build-storybook  # build du Storybook (storybook-static/)
pnpm typecheck        # tsc -b strict
```

Un bouton **« Démo live »** est épinglé en haut à droite du Storybook :
il ouvre la démo (`/demo/index.html`) dans un nouvel onglet, en dev comme
dans le build statique (lien relatif, fonctionne sous sous-chemin).

## Architecture

```
src/
├── index.css            # tokens (brume/action/signal), typo, ombres, motion
├── components/
│   ├── icons.tsx        # icônes ligne fine 1.5px (voile, clé, bouclier…)
│   └── ui/              # Bouton, Jalons, Panneau, Modal, FileDropZone,
│                        # PseudoTableau, TexteApercu, Messages, PastilleStatut
├── lib/statuts.ts       # tons de statut typés (couleur + libellé, AA)
├── stories/
│   ├── foundations/     # couleurs, typographie, icônes
│   ├── ui/              # stories par composant (autodocs)
│   └── patterns/        # écran de revue complet
└── App.tsx              # démo : Déposer → Vérifier → Récupérer
```

## Contraintes respectées (DESIGNSYSTEM.md)

- **Zéro police distante, zéro CDN, zéro tracker** (`connect-src 'none'`) :
  polices **self-hosted** via `@fontsource` (WOFF2 latin embarqués dans le
  bundle — Inter 400/500/600, Source Serif 4 400/600, JetBrains Mono 400/500 —
  soit ~164 Ko servis, chargement lazy par graisse utilisée).
- **La couleur informe, ne décore pas** : tout est en brume, seuls les états
  (tags, statuts), l'action primaire et les erreurs portent une teinte.
- **Accessibilité** : focus visible partout, `aria-label` sur les icônes,
  statut jamais porté par la couleur seule (pastille + libellé),
  `prefers-reduced-motion` désactive tout sauf les fondus d'état.
- **Performance** : bundle JS démo ~52 kB gzip + ~164 Ko de polices WOFF2.

## Vérification

```bash
pnpm typecheck && pnpm build && pnpm build-storybook
```