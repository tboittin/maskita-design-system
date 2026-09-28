import { FilIcon } from '../icons'

export interface EtapeJalon {
  id: string
  libelle: string
}

export function Jalons({
  etapes,
  active,
  onSelect,
  ariaLabel = 'Progression',
}: {
  etapes: EtapeJalon[]
  active: string
  /** Les étapes passées sont cliquables (retour en arrière). */
  onSelect?: (id: string) => void
  /** Libellé ARIA de la navigation (localisable). */
  ariaLabel?: string
}) {
  const activeIndex = etapes.findIndex((e) => e.id === active)
  return (
    <nav aria-label={ariaLabel} className="flex items-center gap-2">
      {etapes.map((etape, i) => {
        const passe = i < activeIndex
        const courante = i === activeIndex
        const future = i > activeIndex
        const cliquable = passe && onSelect
        return (
          <div key={etape.id} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-6 bg-brume-200" aria-hidden="true" />}
            <button
              type="button"
              onClick={cliquable ? () => onSelect(etape.id) : undefined}
              disabled={!cliquable}
              aria-current={courante ? 'step' : undefined}
              aria-disabled={future ? true : undefined}
              className={`group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] transition-colors duration-[150ms] ${
                courante
                  ? 'bg-action-100 font-medium text-action-600'
                  : passe
                    ? 'text-brume-500 hover:bg-brume-100 hover:text-brume-900'
                    : 'text-brume-300'
              }`}
            >
              {courante && <FilIcon className="size-3.5" />}
              {etape.libelle}
            </button>
          </div>
        )
      })}
    </nav>
  )
}
