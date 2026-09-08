import type { ReactNode } from 'react'
import { forwardRef } from 'react'

export type VarianteBouton = 'primaire' | 'secondaire' | 'ghost' | 'danger'
export type TailleBouton = 'sm' | 'md' | 'lg'

export interface BoutonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBouton
  taille?: TailleBouton
  /** Icône à gauche (ou seule). */
  icone?: ReactNode
  /** Icône à droite — typé ReactNode pour accepter un élément. */
  iconeDroite?: ReactNode
  /** Blocage métier : message visible sous/au survol si le bouton est désactivé. */
  raisonDesactive?: string
  children?: ReactNode
}

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

const tailles: Record<TailleBouton, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

export const Bouton = forwardRef<HTMLButtonElement, BoutonProps>(function Bouton(
  { variante = 'primaire', taille = 'md', icone, iconeDroite, raisonDesactive, className = '', children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variantes[variante]} ${tailles[taille]} ${className}`}
      aria-describedby={props.disabled && raisonDesactive ? 'raison-bouton' : undefined}
      {...props}
    >
      {icone && <span className="size-5 shrink-0">{icone}</span>}
      {children && <span className="leading-none">{children}</span>}
      {iconeDroite && <span className="size-5 shrink-0">{iconeDroite}</span>}
    </button>
  )
})