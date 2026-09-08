import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

/**
 * Base commune des icônes Maskita — trait fin 1.5px, style « geste ».
 * Toujours décoratif (aria-hidden) : le sens est porté par title/aria-label
 * au niveau du composant hôte.
 */
function Base({ children, strokeWidth = 1.5, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

/* --- Geste 1 : le voile (anonymiser / masquer) --- */
export const VoileIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 8c0-1.5 1-3 2.5-4S12 2.5 12 2.5s6.5 1 7.5 1.5S20 6.5 20 8c0 1.5-1 3-2.5 4S12 14.5 12 14.5s-6.5-1-7.5-1.5S4 9.5 4 8Z" />
    <path d="M12 14.5V21" />
    <path d="M9 18.5h6" />
  </Base>
)

/* --- Geste 2 : le voile relevé / la clé (restaurer) --- */
export const CleIcon = (props: IconProps) => (
  <Base {...props}>
    <circle cx="8" cy="8" r="4.5" />
    <path d="M11.2 11.2 20 20" />
    <path d="M16.5 16.5 19 19" />
    <path d="M13.5 13.5 15 15" />
  </Base>
)

/* --- Téléchargement : flèche posée --- */
export const TelechargerIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M4 21h16" />
  </Base>
)

/* --- Validation : ✓ léger --- */
export const ValiderIcon = (props: IconProps) => (
  <Base {...props} strokeWidth={2}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Base>
)

/* --- Confiance : bouclier discret avec ✓ --- */
export const BouclierIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 2.5 20 6v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6l8-3.5Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Base>
)

/* --- Ajout --- */
export const PlusIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Base>
)

/* --- Fermeture (Escape / X) --- */
export const FermerIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="m6 6 12 12" />
    <path d="M18 6 6 18" />
  </Base>
)

/* --- Drapeau d'attention (⚠, sans cri) --- */
export const AttentionIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3.5 22 20H2L12 3.5Z" />
    <path d="M12 9.5V14" />
    <path d="M12 16.8v.2" />
  </Base>
)

/* --- Information --- */
export const InfoIcon = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 7.8v.2" />
  </Base>
)

/* --- Casier / fichier --- */
export const FichierIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M14 2.5H6.5a1.5 1.5 0 0 0-1.5 1.5v16a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V8L14 2.5Z" />
    <path d="M14 2.5V8h5.5" />
  </Base>
)

/* --- Fel / aiguille (fil continu) --- */
export const FilIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 12h4l2 6 4-12 2 6h4" />
  </Base>
)