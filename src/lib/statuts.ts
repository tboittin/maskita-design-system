export type ToneStatut = 'nouveau' | 'existant' | 'conflit' | 'vide' | 'sain'

export interface StyleStatut {
  pastille: string
  texte: string
  fond: string
  libelle: string
}

/**
 * Les statuts se lisent à la pastille ET au libellé (AA : jamais la couleur seule).
 */
export const statuts: Record<ToneStatut, StyleStatut> = {
  nouveau: {
    pastille: 'bg-signal-succes',
    texte: 'text-signal-succes',
    fond: 'bg-signal-succes-fond',
    libelle: 'Nouveau',
  },
  existant: {
    pastille: 'bg-brume-300',
    texte: 'text-brume-500',
    fond: 'bg-brume-100',
    libelle: 'Existant',
  },
  conflit: {
    pastille: 'bg-signal-erreur',
    texte: 'text-signal-erreur',
    fond: 'bg-signal-erreur-fond',
    libelle: 'Conflit',
  },
  vide: {
    pastille: 'bg-brume-200',
    texte: 'text-brume-500',
    fond: 'bg-brume-50',
    libelle: 'Vide',
  },
  sain: {
    pastille: 'bg-signal-succes',
    texte: 'text-signal-succes',
    fond: 'bg-signal-succes-fond',
    libelle: 'Sûr',
  },
}