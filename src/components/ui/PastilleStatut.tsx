import type { ToneStatut } from '../../lib/statuts'
import { statuts } from '../../lib/statuts'

/**
 * Petite pastille ronde d'état + libellé — l'état ne se lit jamais
 * par la couleur seule (AA).
 */
export function PastilleStatut({ statut, avecLibelle = false }: { statut: ToneStatut; avecLibelle?: boolean }) {
  const s = statuts[statut]
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-block size-2.5 shrink-0 rounded-full ${s.pastille}`}
        aria-hidden="true"
      />
      {avecLibelle && <span className={`text-xs font-medium ${s.texte}`}>{s.libelle}</span>}
    </span>
  )
}