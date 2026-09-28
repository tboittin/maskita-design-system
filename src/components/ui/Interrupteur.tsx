import { type ReactNode, useCallback } from 'react'

export interface InterrupteurProps {
  actif: boolean
  onChange: (actif: boolean) => void
  /** Nom accessible (aria-label) — obligatoire */
  ariaLabel: string
  /** Icône à gauche du libellé (optionnelle) */
  icone?: ReactNode
  /** Libellé textuel affiché */
  children?: ReactNode
  desactive?: boolean
}

export function Interrupteur({
  actif,
  onChange,
  ariaLabel,
  icone,
  children,
  desactive = false,
}: InterrupteurProps) {
  const basculer = useCallback(() => {
    if (!desactive) onChange(!actif)
  }, [actif, desactive, onChange])

  return (
    <button
      type="button"
      role="button"
      aria-pressed={actif}
      aria-label={ariaLabel}
      disabled={desactive}
      onClick={basculer}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          basculer()
        }
      }}
      className={`
        inline-flex items-center gap-2 rounded-[8px] px-3 py-2
        text-[13px] font-medium transition-[background-color,border-color,color] duration-[150ms]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-500
        disabled:opacity-45 disabled:cursor-not-allowed select-none
        min-h-[24px]
        ${actif
          ? 'bg-action-100 text-action-600'
          : 'bg-brume-100 text-brume-500 hover:bg-brume-50 hover:text-brume-700'
        }
      `}
    >
      {/* Icône ligne fine : pastille ronde */}
      <span
        className={`
          inline-flex size-4 shrink-0 items-center justify-center rounded-full border
          transition-[background-color,border-color] duration-[150ms]
          ${actif
            ? 'border-action-600 bg-action-600'
            : 'border-brume-300 bg-transparent'
          }
        `}
        aria-hidden="true"
      >
        {actif && (
          <svg className="size-2.5 text-white" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {icone && <span className="size-4 shrink-0" aria-hidden="true">{icone}</span>}
      {children && <span>{children}</span>}
    </button>
  )
}
