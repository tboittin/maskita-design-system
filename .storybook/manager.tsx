import { addons, types } from '@storybook/manager-api'

/**
 * Bouton « Démo live » dans la barre supérieure du Storybook.
 *
 * Le bundler du manager fournit React via le global `__REACT__` (il strippe
 * les imports `react`), donc on le référence explicitement.
 * Lien relatif : fonctionne en dev (localhost:6006) et en build statique,
 * y compris déployé sous un sous-chemin (ex. /maskita-design-system/).
 */
declare const __REACT__: typeof import('react')

const React = __REACT__

const DemoLink = () => (
  <a
    href="demo/index.html"
    target="_blank"
    rel="noreferrer"
    title="Ouvrir la démo interactive dans un nouvel onglet"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 12px',
      marginRight: 8,
      borderRadius: 8,
      background: '#5b5bd6',
      color: '#fff',
      fontSize: 13,
      fontWeight: 500,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transition: 'background-color 150ms',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#6d6de0'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#5b5bd6'
    }}
  >
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
    Démo live
  </a>
)

addons.register('maskita/demo-link', () => {
  addons.add('maskita/demo-link', {
    title: 'Ouvrir la démo',
    type: types.TOOL,
    match: () => true,
    render: () => <DemoLink />,
  })
})