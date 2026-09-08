import { FilIcon } from '../icons'

export interface EtapeJalon {
  id: string
  libelle: string
}

export function Jalons({
  etapes,
  active,
  onSelect,
}: {
  etapes: EtapeJalon[]
  active: string
  /** Les étapes passées sont cliquables (retour en arrière). */
  onSelect?: (id: string) => void
}) {
  const activeIndex = etapes.findIndex((e) => e.id === active)
  return (
    <nav aria-label="Progression" className="flex items-center gap-2">
      {etapes.map((etape, i) => {
        const passe = i < activeIndex
        const courante = i === activeIndex
        const cliquable = passe && onSelect
        return (
          <div key={etape.id} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-6 bg-brume-200" aria-hidden="true" />}
            <button
              type="button"
              onClick={cliquable ? () => onSelect(etape.id) : undefined}
              disabled={!cliquable}
              className={`group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] transition-colors duration-[150ms] ${
                courante
                  ? 'bg-action-100 font-medium text-action-600'
                  : passe
                    ? 'text-brume-500 hover:bg-brume-100 hover:text-brume-900'
                    : 'text-brume-300'
              }`}
              aria-current={courante ? 'step' : undefined}
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