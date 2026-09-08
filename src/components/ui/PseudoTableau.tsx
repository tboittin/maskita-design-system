import type { ToneStatut } from '../../lib/statuts'
import { PastilleStatut } from './PastilleStatut'

export interface LignePseudo {
  tag: string
  statut: ToneStatut
  valeurs: string[]
  conflitMessage?: string
  isActive?: boolean
}

/**
 * Ligne de tag du PseudoTableau — tag mono + pastille ronde d'état.
 * Les tags sont des boutons (clavier : Enter/Space).
 */
export function LigneTag({
  ligne,
  active,
  onSelect,
  onAjouter,
}: {
  ligne: LignePseudo
  active: boolean
  onSelect: () => void
  onAjouter?: () => void
}) {
  return (
    <div
      className={`border-b border-brume-200/60 px-4 py-3 transition-colors duration-[150ms] ${
        active ? 'border-l-2 border-l-action-500 bg-action-100/60' : 'hover:bg-brume-50'
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-3 text-left"
        aria-pressed={active}
      >
        <span className="font-donnees text-[13px] font-medium text-brume-900">{ligne.tag}</span>
        <PastilleStatut statut={ligne.statut} />
      </button>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 pl-[38px]">
        {ligne.valeurs.slice(0, 4).map((v) => (
          <span
            key={v}
            className="font-donnees inline-block max-w-40 truncate rounded-md bg-brume-100 px-2 py-0.5 text-[11px] text-brume-700"
          >
            {v}
          </span>
        ))}
        {ligne.valeurs.length > 4 && (
          <span className="text-[11px] text-brume-500">+{ligne.valeurs.length - 4}</span>
        )}
        {onAjouter && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onAjouter()
            }}
            className="text-[11px] font-medium text-action-600 hover:text-action-500"
          >
            + Ajouter
          </button>
        )}
      </div>
      {ligne.conflitMessage && (
        <p className="mt-1.5 flex items-center gap-1.5 pl-[38px] text-xs text-signal-erreur animate-fade-in">
          {ligne.conflitMessage}
          <button type="button" className="font-medium underline decoration-dotted underline-offset-2 hover:text-signal-erreur/80">
            voir
          </button>
        </p>
      )}
    </div>
  )
}

export function PseudoTableau({
  lignes,
  activeTag,
  onSelect,
  onAjouterPseudo,
}: {
  lignes: LignePseudo[]
  activeTag: string
  onSelect: (tag: string) => void
  onAjouterPseudo?: () => void
}) {
  return (
    <div role="table" aria-label="Tableau des pseudonymes" className="flex h-full flex-col">
      <div role="rowgroup" className="flex items-center justify-between border-b border-brume-200/60 px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wide text-brume-500">Pseudonymes</span>
        {onAjouterPseudo && (
          <button
            type="button"
            onClick={onAjouterPseudo}
            className="text-xs font-medium text-action-600 hover:text-action-500"
          >
            + Ajouter un pseudo
          </button>
        )}
      </div>
      <div role="rowgroup" className="overflow-y-auto py-1">
        {lignes.map((l) => (
          <div role="row" key={l.tag}>
            <LigneTag ligne={l} active={l.tag === activeTag} onSelect={() => onSelect(l.tag)} onAjouter={onAjouterPseudo} />
          </div>
        ))}
        {lignes.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-brume-500">Aucun pseudonyme détecté.</p>
        )}
      </div>
    </div>
  )
}