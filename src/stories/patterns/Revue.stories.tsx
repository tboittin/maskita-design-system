import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Jalons } from '../../components/ui/Jalons'
import { Panneau } from '../../components/ui/Panneau'
import { FileDropZone } from '../../components/ui/FileDropZone'
import { TexteApercu, SurbrillanceTag } from '../../components/ui/TexteApercu'
import { MessageInfo, MessageSucces } from '../../components/ui/Messages'
import { Bouton } from '../../components/ui/Bouton'
import { ValiderIcon, TelechargerIcon, BouclierIcon } from '../../components/icons'

const meta: Meta = {
  title: 'Patterns/Écran de revue',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

const etapes = [
  { id: 'deposer', libelle: 'Déposer' },
  { id: 'verifier', libelle: 'Vérifier' },
  { id: 'recuperer', libelle: 'Récupérer' },
]

export const RevueComplete: Story = {
  render: function RevueComplete() {
    const [etape, setEtape] = useState('verifier')
    const [valide, setValide] = useState(false)
    return (
      <div className="flex min-h-screen flex-col bg-brume-100">
        {/* Header */}
        <header className="border-b border-brume-200/70 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
            <h1 className="text-lg font-semibold text-brume-900">Maskita</h1>
            <Jalons etapes={etapes} active={etape} onSelect={setEtape} />
          </div>
        </header>

        <main className="mx-auto grid w-full max-w-[1100px] flex-1 grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Colonne gauche : le tableau des pseudos */}
          <div className="flex flex-col gap-4">
            <MessageInfo>
              Voile posé sur 3 pseudonymes. Aucun conflit détecté pour l'instant.
            </MessageInfo>
            <Panneau title="Pseudonymes" className="min-h-64">
              <FileDropZone />
            </Panneau>
          </div>

          {/* Colonne droite : les deux aperçus côte à côte */}
          <TexteApercu mode={etape === 'recuperer' ? 'lisible' : 'masque'} titre="Document">
            <p>
              Bonjour <SurbrillanceTag actif>Jean Dupont</SurbrillanceTag>, nous confirmons
              votre rendez-vous le 12 mars à 14 h 30. Si vous souhaitez le déplacer, répondez
              à ce courrier avant le 1er mars.
            </p>
            <p className="mt-4">
              L'adresse du cabinet : 12 rue des Lilas, 75011 Paris. Merci de vous présenter
              avec votre pièce d'identité.
            </p>
          </TexteApercu>
        </main>

        {/* Barre de validation, toujours visible, calme */}
        {etape !== 'deposer' && (
          <footer className="sticky bottom-0 border-t border-brume-200/70 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-3">
              <span className="inline-flex items-center gap-2 text-[13px] text-brume-500">
                <BouclierIcon className="size-4 text-signal-succes" /> 100 % local — aucune donnée sortante
              </span>
              <div className="flex items-center gap-3">
                {valide && <MessageSucces onFermer={() => setValide(false)}>Document prêt</MessageSucces>}
                <Bouton
                  variante="secondaire"
                  taille="sm"
                  onClick={() => setEtape('deposer')}
                >
                  Retour
                </Bouton>
                <Bouton
                  iconeDroite={<TelechargerIcon />}
                  onClick={() => setValide(true)}
                >
                  Valider et télécharger
                </Bouton>
              </div>
            </div>
          </footer>
        )}
      </div>
    )
  },
}