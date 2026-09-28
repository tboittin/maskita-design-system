import { useRef, useCallback, type KeyboardEvent } from 'react'

export interface Onglet {
  id: string
  libelle: string
}

export interface OngletsProps {
  onglets: Onglet[]
  actif: string
  onChange: (id: string) => void
  ariaLabel?: string
}

export function Onglets({ onglets, actif, onChange, ariaLabel = 'Navigation par onglets' }: OngletsProps) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const activer = useCallback((id: string) => {
    if (id !== actif) onChange(id)
  }, [actif, onChange])

  const naviguer = useCallback((e: KeyboardEvent<HTMLButtonElement>, indexCourant: number) => {
    let nouvelIndex = indexCourant
    switch (e.key) {
      case 'ArrowRight':
        nouvelIndex = (indexCourant + 1) % onglets.length
        break
      case 'ArrowLeft':
        nouvelIndex = (indexCourant - 1 + onglets.length) % onglets.length
        break
      case 'Home':
        nouvelIndex = 0
        break
      case 'End':
        nouvelIndex = onglets.length - 1
        break
      default:
        return
    }
    e.preventDefault()
    const cible = onglets[nouvelIndex]
    activer(cible.id)
    tabRefs.current.get(cible.id)?.focus()
  }, [onglets, activer])

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-0">
      {onglets.map((onglet, i) => {
        const estActif = onglet.id === actif
        return (
          <button
            key={onglet.id}
            ref={(el) => { if (el) tabRefs.current.set(onglet.id, el) }}
            role="tab"
            id={`tab-${onglet.id}`}
            aria-selected={estActif}
            aria-controls={`panel-${onglet.id}`}
            tabIndex={estActif ? 0 : -1}
            onClick={() => activer(onglet.id)}
            onKeyDown={(e) => naviguer(e, i)}
            className={`
              px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-[150ms]
              focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-action-500
              ${estActif
                ? 'bg-white text-brume-900 border border-brume-200 border-b-white -mb-px'
                : 'bg-brume-100 text-brume-500 hover:text-brume-700 hover:bg-brume-50 border border-transparent'
              }
            `}
          >
            {onglet.libelle}
          </button>
        )
      })}
    </div>
  )
}

export function PanneauOnglet({ id, actif, children, className = '' }: {
  id: string
  actif: boolean
  children: React.ReactNode
  className?: string
}) {
  if (!actif) return null
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={className}
    >
      {children}
    </div>
  )
}
