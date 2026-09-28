import type { ReactNode } from 'react'
import { forwardRef } from 'react'

export type VarianteBouton = 'primaire' | 'secondaire' | 'ghost' | 'danger'
export type TailleBouton = 'sm' | 'md' | 'lg'

type BoutonBaseProps = {
  variante?: VarianteBouton
  taille?: TailleBouton
  /** Icône à gauche (ou seule). */
  icone?: ReactNode
  /** Icône à droite — typé ReactNode pour accepter un élément. */
  iconeDroite?: ReactNode
  /** Blocage métier : message visible sous/au survol si le bouton est désactivé. */
  raisonDesactive?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export type BoutonProps = BoutonBaseProps & (
  | {
      children: ReactNode
      /** Nom accessible — optionnel quand children est présent. */
      ariaLabel?: string
    }
  | {
      children?: undefined
      /** Nom accessible — obligatoire si children est absent (icône seule). */
      ariaLabel: string
    }
)

const base =
  'inline-flex items-center justify-center gap-2 rounded-[8px] font-medium ' +
  'transition-[background-color,border-color,color,opacity] duration-[150ms] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-500 ' +
  'disabled:opacity-45 disabled:cursor-not-allowed select-none'

const variantes: Record<VarianteBouton, string> = {
  primaire: 'bg-action-600 text-white hover:bg-action-500 active:bg-action-600',
  secondaire: 'bg-brume-100 border border-brume-200 text-brume-700 hover:bg-brume-50',
  ghost: 'text-brume-500 hover:text-brume-900 hover:bg-brume-100/60',
  danger: 'bg-signal-erreur text-white hover:opacity-90',
}

/*
 * Audit horizontal padding — incohérences constatées (non modifiées ici) :
 *
 * Composant        | px (horizontal)
 * ─────────────────┼────────────────
 * Bouton (sm)      | 16 → px-4   ✓ (nouveau)
 * Bouton (md)      | 20 → px-5   ✓ (nouveau)
 * Bouton (lg)      | 24 → px-6   ✓ (nouveau)
 * Panneau (header) | 24 → px-6
 * Panneau (body)   | hérité du parent (aucun direct)
 * Modal (header)   | 28 → px-7
 * Modal (content)  | 28 → px-7
 * Modal (footer)   | 28 → px-7
 * FileDropZone     | 32 → px-8
 * MessageSucces    | 12 → px-3
 * MessageErreur    | 16 → px-4
 * MessageInfo      | 16 → px-4
 * LigneTag         | 16 → px-4
 * PseudoTableau hdr| 16 → px-4
 * TexteApercu hdr  | 20 → px-5
 * TexteApercu body | 40 → px-10
 *
 * Les valeurs sont assez disparates (12 à 40). Pas de système scalaire
 * unique évident. Si harmonisation future : prévoir un token spacing
 * (ex: --pad-xs / --pad-sm / --pad-md) plutôt que des px-* en dur.
 */

const tailles: Record<TailleBouton, string> = {
  sm: 'min-h-[24px] px-4 py-[10px] text-[13px]',
  md: 'min-h-[32px] px-5 py-[10px] text-sm',
  lg: 'min-h-[40px] px-6 py-[10px] text-[15px]',
}

export const Bouton = forwardRef<HTMLButtonElement, BoutonProps>(function Bouton(
  { variante = 'primaire', taille = 'md', icone, iconeDroite, raisonDesactive, ariaLabel, className = '', children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variantes[variante]} ${tailles[taille]} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={props.disabled && raisonDesactive ? 'raison-bouton' : undefined}
      {...props}
    >
      {icone && <span className="size-5 shrink-0">{icone}</span>}
      {children && <span className="leading-none">{children}</span>}
      {iconeDroite && <span className="size-5 shrink-0">{iconeDroite}</span>}
    </button>
  )
})
