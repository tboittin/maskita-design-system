import type { ToneStatut } from '../../lib/statuts'
import { statuts } from '../../lib/statuts'
import { ValiderIcon, AttentionIcon, BouclierIcon } from '../icons'
import type { ComponentType } from 'react'

const iconsParStatut: Record<ToneStatut, ComponentType<{ className?: string }> | null> = {
  nouveau: ValiderIcon,
  existant: null,
  conflit: AttentionIcon,
  vide: null,
  sain: BouclierIcon,
}

const ariaLabels: Record<ToneStatut, string> = {
  nouveau: 'Nouveau tag',
  existant: 'Tag existant',
  conflit: 'Conflit',
  vide: 'Vide',
  sain: 'Sûr',
}

/**
 * Petite pastille ronde d'état + libellé — l'état ne se lit jamais
 * par la couleur seule (AA).
 *
 * En mode « accessibilité renforcée », le libellé est toujours visible
 * (avecLibelle forcé à true) et le sélecteur [data-accessibilite="renforcee"]
 * permet de surcharger l'affichage par CSS.
 */
export function PastilleStatut({
  statut,
  avecLibelle = false,
  accessibiliteRenforcee = false,
}: {
  statut: ToneStatut
  avecLibelle?: boolean
  /** Mode accessibilité renforcée : libellé toujours visible. */
  accessibiliteRenforcee?: boolean
}) {
  const s = statuts[statut]
  const Icon = iconsParStatut[statut]
  const ariaLabel = ariaLabels[statut]
  const afficherLibelle = avecLibelle || accessibiliteRenforcee

  return (
    <span
      className="inline-flex items-center gap-2"
      data-accessibilite={accessibiliteRenforcee ? 'renforcee' : undefined}
      aria-label={ariaLabel}
    >
      {Icon ? (
        <Icon className="size-3.5" aria-hidden="true" />
      ) : statut === 'vide' ? (
        <span className="inline-block size-2.5 shrink-0 rounded-full border-2 border-brume-300" aria-hidden="true" />
      ) : (
        <span
          className={`inline-block size-2.5 shrink-0 rounded-full ${s.pastille}`}
          aria-hidden="true"
        />
      )}
      {afficherLibelle && (
        <span className={`text-xs font-medium ${s.texte} pastille-libelle`}>{s.libelle}</span>
      )}
    </span>
  )
}
