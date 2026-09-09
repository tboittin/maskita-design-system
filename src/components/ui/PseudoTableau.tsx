import { useRef, useState } from 'react'
import type { ToneStatut } from '../../lib/statuts'
import { PastilleStatut } from './PastilleStatut'

export interface LignePseudo {
  tag: string
  statut: ToneStatut
  valeurs: string[]
  conflitMessage?: string
  isActive?: boolean
}

export interface LigneTagProps {
  ligne: LignePseudo
  active: boolean
  onSelect: () => void
  onAjouter?: () => void
  /** Renommer le tag (édition inline au double-clic). */
  onRenommer?: (nouveau: string) => void
  /** Clic sur une valeur (surbrillance croisée). */
  onValeurClick?: (valeur: string) => void
  /** Retirer une valeur du tag. */
  onRetirerValeur?: (valeur: string) => void
  /** Lien « voir » d'un conflit (sync-scroll vers les aperçus). */
  onConflitVoir?: () => void
  /** Déplacer une valeur vers un autre tag (drag & drop). */
  onDeplacerValeur?: (valeur: string, tagSource: string, tagCible: string) => void
  /** Réordonner les valeurs au sein d'un tag (drag & drop). */
  onReordonnerValeurs?: (tag: string, debut: number, fin: number) => void
  /** Nombre max de valeurs affichées (défaut 4). */
  maxValeursAffichees?: number
  /** Libellé du lien « voir » d'un conflit (localisable). */
  libelleVoir?: string
  /** Ajouter une valeur au tag (bouton ➕ + input inline). */
  onAjouterValeur?: (valeur: string) => void
  /** Vider le tag (demande de suppression). */
  onViderTag?: () => void
  libelleAjouterValeur?: string
  libelleRetirerValeur?: (valeur: string) => string
  placeholderNouvelleValeur?: string
  libelleViderTag?: string
  libelleValeursVides?: string

  /** Interne : marqueur de drag posé par PseudoTableau. */
  onMarquerDrag?: (valeur: string, index: number) => void
  onDeposerSurLigne?: (tagCible: string) => void
  onDeposerSurValeur?: (tagCible: string, indexCible: number) => void
  dragOver?: boolean
  setDragOver?: (tag: string | null) => void
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
  onRenommer,
  onValeurClick,
  onRetirerValeur,
  onConflitVoir,
  maxValeursAffichees = 4,
  onMarquerDrag,
  onDeposerSurLigne,
  onDeposerSurValeur,
  dragOver,
  setDragOver,
  libelleVoir = 'voir',
  onAjouterValeur,
  onViderTag,
  libelleAjouterValeur = 'Ajouter une valeur',
  libelleRetirerValeur = (v) => `Retirer ${v}`,
  placeholderNouvelleValeur = 'Nouvelle valeur…',
  libelleViderTag = 'Supprimer',
  libelleValeursVides = 'vide',
}: LigneTagProps) {
  const [edition, setEdition] = useState(false)
  const [nouveauNom, setNouveauNom] = useState(ligne.tag)
  const [ajoutValeur, setAjoutValeur] = useState(false)
  const [nouvelleValeur, setNouvelleValeur] = useState('')

  const confirmerRenommage = () => {
    if (edition && nouveauNom.trim() && nouveauNom.trim() !== ligne.tag) {
      onRenommer?.(nouveauNom.trim())
    }
    setEdition(false)
  }

  const confirmerAjoutValeur = () => {
    if (nouvelleValeur.trim()) onAjouterValeur?.(nouvelleValeur.trim())
    setNouvelleValeur('')
    setAjoutValeur(false)
  }

  return (
    <div
      className={`border-b border-brume-200/60 px-4 py-3 transition-colors duration-[150ms] ${
        dragOver ? 'bg-signal-succes/10' : active ? 'border-l-2 border-l-action-500 bg-action-100/60' : 'hover:bg-brume-50'
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver?.(ligne.tag)
      }}
      onDragLeave={() => setDragOver?.(null)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver?.(null)
        onDeposerSurLigne?.(ligne.tag)
      }}
    >
      <div className="flex w-full items-center gap-3 text-left">
        {edition ? (
          <input
            value={nouveauNom}
            onChange={(e) => setNouveauNom(e.target.value)}
            onBlur={confirmerRenommage}
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirmerRenommage()
              if (e.key === 'Escape') setEdition(false)
            }}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            className="font-donnees w-full rounded-md border border-action-300 bg-white px-2 py-1 text-[13px] font-medium text-brume-900 focus:outline-2 focus:outline-offset-1 focus:outline-action-500"
          />
        ) : (
          <button
            type="button"
            onClick={onSelect}
            onDoubleClick={() => {
              if (!onRenommer) return
              setEdition(true)
              setNouveauNom(ligne.tag)
            }}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
            aria-pressed={active}
          >
            <span className="font-donnees truncate text-[13px] font-medium text-brume-900">{ligne.tag}</span>
            <PastilleStatut statut={ligne.statut} />
          </button>
        )}
        {onAjouter && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onAjouter()
            }}
            className="shrink-0 text-[11px] font-medium text-action-600 hover:text-action-500"
          >
            + Ajouter
          </button>
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 pl-[38px]">
        {ligne.valeurs.length === 0 && (
          <span className="text-[11px] italic text-brume-400">{libelleValeursVides}</span>
        )}
        {ligne.valeurs.slice(0, maxValeursAffichees).map((v, idx) => (
          <span
            key={v}
            draggable={!!onMarquerDrag}
            onDragStart={(e) => {
              onMarquerDrag?.(v, idx)
              e.dataTransfer.effectAllowed = 'move'
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDeposerSurValeur?.(ligne.tag, idx)
            }}
            className="font-donnees inline-flex max-w-40 items-center gap-1 rounded-md bg-brume-100 px-2 py-0.5 text-[11px] text-brume-700"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onValeurClick?.(v)
              }}
              className="truncate hover:text-brume-900"
            >
              {v}
            </button>
            {onRetirerValeur && (
              <button
                type="button"
                aria-label={libelleRetirerValeur(v)}
                onClick={(e) => {
                  e.stopPropagation()
                  onRetirerValeur(v)
                }}
                className="shrink-0 text-brume-400 hover:text-signal-erreur"
              >
                ✕
              </button>
            )}
          </span>
        ))}
        {ligne.valeurs.length > maxValeursAffichees && (
          <span className="text-[11px] text-brume-500">+{ligne.valeurs.length - maxValeursAffichees}</span>
        )}
        {onAjouterValeur && !ajoutValeur && (
          <button
            type="button"
            aria-label={libelleAjouterValeur}
            onClick={(e) => {
              e.stopPropagation()
              setAjoutValeur(true)
            }}
            className="text-[11px] font-medium text-action-600 hover:text-action-500"
          >
            ➕
          </button>
        )}
        {onAjouterValeur && ajoutValeur && (
          <span className="inline-flex items-center gap-1">
            <input
              value={nouvelleValeur}
              onChange={(e) => setNouvelleValeur(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmerAjoutValeur()
                if (e.key === 'Escape') {
                  setAjoutValeur(false)
                  setNouvelleValeur('')
                }
              }}
              onBlur={confirmerAjoutValeur}
              placeholder={placeholderNouvelleValeur}
              autoFocus
              className="w-32 rounded-md border border-brume-200 px-2 py-1 text-[11px] focus:outline-2 focus:outline-offset-1 focus:outline-action-500"
            />
          </span>
        )}
        {onViderTag && (
          <button
            type="button"
            aria-label={libelleViderTag}
            onClick={(e) => {
              e.stopPropagation()
              onViderTag()
            }}
            className="shrink-0 text-brume-400 hover:text-signal-erreur"
          >
            🗑
          </button>
        )}
      </div>
      {ligne.conflitMessage && (
        <p className="mt-1.5 flex items-center gap-1.5 pl-[38px] text-xs text-signal-erreur animate-fade-in">
          {ligne.conflitMessage}
          {onConflitVoir && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onConflitVoir()
              }}
              className="font-medium underline decoration-dotted underline-offset-2 hover:text-signal-erreur/80"
            >
              {libelleVoir}
            </button>
          )}
        </p>
      )}
    </div>
  )
}

export interface PseudoTableauProps {
  lignes: LignePseudo[]
  activeTag: string
  onSelect: (tag: string) => void
  onAjouterPseudo?: () => void
  onRenommer?: (ancien: string, nouveau: string) => void
  onValeurClick?: (tag: string, valeur: string) => void
  onRetirerValeur?: (tag: string, valeur: string) => void
  onConflitVoir?: (tag: string) => void
  onDeplacerValeur?: (valeur: string, tagSource: string, tagCible: string) => void
  onReordonnerValeurs?: (tag: string, debut: number, fin: number) => void
  maxValeursAffichees?: number
  libelleTitre?: string
  libelleAjouter?: string
  libelleAucun?: string
  libelleVoir?: string
  onAjouterValeur?: (tag: string, valeur: string) => void
  onViderTag?: (tag: string) => void
  libelleAjouterValeur?: string
  libelleRetirerValeur?: (valeur: string) => string
  placeholderNouvelleValeur?: string
  libelleViderTag?: string
  libelleValeursVides?: string
}

export function PseudoTableau({
  lignes,
  activeTag,
  onSelect,
  onAjouterPseudo,
  onRenommer,
  onValeurClick,
  onRetirerValeur,
  onConflitVoir,
  onDeplacerValeur,
  onReordonnerValeurs,
  maxValeursAffichees = 4,
  libelleTitre = 'Pseudonymes',
  libelleAjouter = '+ Ajouter un pseudo',
  libelleAucun = 'Aucun pseudonyme détecté.',
  libelleVoir = 'voir',
  onAjouterValeur,
  onViderTag,
  libelleAjouterValeur,
  libelleRetirerValeur,
  placeholderNouvelleValeur,
  libelleViderTag,
  libelleValeursVides,
}: PseudoTableauProps) {
  const dragValue = useRef<{ valeur: string; tagSource: string; index: number } | null>(null)
  const [dragOverTag, setDragOverTag] = useState<string | null>(null)

  const handleMarquerDrag = (valeur: string, index: number) => {
    const ligne = lignes.find((l) => l.valeurs.includes(valeur))
    if (!ligne) return
    dragValue.current = { valeur, tagSource: ligne.tag, index }
  }

  const handleDeposerSurLigne = (tagCible: string) => {
    const dv = dragValue.current
    if (!dv || dv.tagSource === tagCible) return
    onDeplacerValeur?.(dv.valeur, dv.tagSource, tagCible)
    dragValue.current = null
  }

  const handleDeposerSurValeur = (tagCible: string, indexCible: number) => {
    const dv = dragValue.current
    if (!dv) return
    if (dv.tagSource === tagCible && dv.index !== indexCible) {
      onReordonnerValeurs?.(tagCible, dv.index, indexCible)
    } else if (dv.tagSource !== tagCible) {
      onDeplacerValeur?.(dv.valeur, dv.tagSource, tagCible)
    }
    dragValue.current = null
  }

  return (
    <div role="table" aria-label="Tableau des pseudonymes" className="flex h-full flex-col">
      <div role="rowgroup" className="flex items-center justify-between border-b border-brume-200/60 px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wide text-brume-500">{libelleTitre}</span>
        {onAjouterPseudo && (
          <button
            type="button"
            onClick={onAjouterPseudo}
            className="text-xs font-medium text-action-600 hover:text-action-500"
          >
            {libelleAjouter}
          </button>
        )}
      </div>
      <div role="rowgroup" className="overflow-y-auto py-1">
        {lignes.map((l) => (
          <div role="row" key={l.tag} onDragOver={(e) => e.preventDefault()}>
            <LigneTag
              ligne={l}
              active={l.tag === activeTag}
              onSelect={() => onSelect(l.tag)}
              onAjouter={onAjouterPseudo}
              onRenommer={onRenommer ? (nouveau) => onRenommer(l.tag, nouveau) : undefined}
              onValeurClick={onValeurClick ? (valeur) => onValeurClick(l.tag, valeur) : undefined}
              onRetirerValeur={onRetirerValeur ? (valeur) => onRetirerValeur(l.tag, valeur) : undefined}
              onConflitVoir={onConflitVoir ? () => onConflitVoir(l.tag) : undefined}
              maxValeursAffichees={maxValeursAffichees}
              onMarquerDrag={onDeplacerValeur || onReordonnerValeurs ? handleMarquerDrag : undefined}
              onDeposerSurLigne={onDeplacerValeur ? handleDeposerSurLigne : undefined}
              onDeposerSurValeur={onDeplacerValeur || onReordonnerValeurs ? handleDeposerSurValeur : undefined}
              dragOver={dragOverTag === l.tag}
              setDragOver={setDragOverTag}
              libelleVoir={libelleVoir}
              onAjouterValeur={onAjouterValeur ? (valeur) => onAjouterValeur(l.tag, valeur) : undefined}
              onViderTag={onViderTag ? () => onViderTag(l.tag) : undefined}
              libelleAjouterValeur={libelleAjouterValeur}
              libelleRetirerValeur={libelleRetirerValeur}
              placeholderNouvelleValeur={placeholderNouvelleValeur}
              libelleViderTag={libelleViderTag}
              libelleValeursVides={libelleValeursVides}
            />
          </div>
        ))}
        {lignes.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-brume-500">{libelleAucun}</p>
        )}
      </div>
    </div>
  )
}