import { useMemo, useState } from 'react'
import {
  Bouton,
  ConfirmationDestructive,
  FileDropZone,
  Jalons,
  MessageInfo,
  MessageSucces,
  Panneau,
  PseudoTableau,
  SurbrillanceTag,
  TexteApercu,
} from './components/ui'
import { BouclierIcon, CleIcon, TelechargerIcon, VoileIcon } from './components/icons'
import type { LignePseudo } from './components/ui'

const jalons = [
  { id: 'deposer', libelle: 'Déposer' },
  { id: 'verifier', libelle: 'Vérifier' },
  { id: 'recuperer', libelle: 'Récupérer' },
]

const EXTRAITS = {
  masque: (
    <>
      <p>
        Bonjour <SurbrillanceTag actif>[PERSONNE]</SurbrillanceTag>, nous confirmons votre
        rendez-vous le <SurbrillanceTag actif={false}>[DATE]</SurbrillanceTag> à 14 h 30.
      </p>
      <p className="mt-4">
        L'adresse du cabinet : <SurbrillanceTag actif={false}>[ADRESSE]</SurbrillanceTag>.
        Pour toute question, écrivez à <SurbrillanceTag actif={false}>[EMAIL]</SurbrillanceTag>.
      </p>
    </>
  ),
  lisible: (
    <>
      <p>
        Bonjour Jean Dupont, nous confirmons votre rendez-vous le 12 mars à 14 h 30.
      </p>
      <p className="mt-4">
        L'adresse du cabinet : 12 rue des Lilas. Pour toute question, écrivez à
        j.dupont@mail.fr.
      </p>
    </>
  ),
}

export default function App() {
  const [etape, setEtape] = useState('deposer')
  const [fichier, setFichier] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState('[PERSONNE]')
  const [modalOuverte, setModalOuverte] = useState(false)
  const [valide, setValide] = useState(false)

  const lignes: LignePseudo[] = useMemo(
    () => [
      { tag: '[PERSONNE]', statut: 'nouveau', valeurs: ['Jean Dupont', 'Mme Martin'] },
      { tag: '[DATE]', statut: 'existant', valeurs: ['12 mars'] },
      {
        tag: '[EMAIL]',
        statut: 'conflit',
        valeurs: ['j.dupont@mail.fr', 'j.dupont@gmail.fr'],
        conflitMessage: 'Deux valeurs différentes pour un même tag.',
      },
      { tag: '[ADRESSE]', statut: 'existant', valeurs: ['12 rue des Lilas'] },
    ],
    [],
  )

  const peutValider = fichier !== null
  const toutEstSain = valide

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-6 py-8">
      {/* Header — titre centré, badge de confiance à droite */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-action-600">
            <VoileIcon className="size-7" />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-brume-900">Maskita</h1>
            <p className="text-[13px] text-brume-500">Le voile léger — design system</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Jalons etapes={jalons} active={etape} onSelect={setEtape} />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6">
        {/* Étape 1 : Déposer */}
        {etape === 'deposer' && (
          <section className="animate-fade-down" aria-label="Déposer un rapport">
            <Panneau title="Déposer votre rapport">
              <div className="p-6">
                <FileDropZone onFichier={(i) => setFichier(i.nom)} />
                <div className="mt-6 flex justify-end gap-3">
                  <Bouton
                    variante="primaire"
                    disabled={!peutValider}
                    raisonDesactive="Chargez d'abord un fichier"
                    onClick={() => {
                      setValide(false)
                      setEtape('verifier')
                    }}
                  >
                    Lancer l'analyse
                  </Bouton>
                </div>
              </div>
            </Panneau>
          </section>
        )}

        {/* Étape 2 : Vérifier */}
        {etape === 'verifier' && (
          <section className="grid animate-fade-down grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]" aria-label="Vérifier les pseudonymes">
            <div className="flex flex-col gap-4">
              <MessageInfo>
                Voile posé sur {lignes.length} pseudonymes. {activeTag} est sélectionné.
              </MessageInfo>
              <Panneau
                title="Pseudonymes"
                className="min-h-[420px]"
                action={
                  !toutEstSain ? undefined : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal-succes">
                      <BouclierIcon className="size-4" /> Tout est sûr
                    </span>
                  )
                }
              >
                <PseudoTableau
                  lignes={lignes}
                  activeTag={activeTag}
                  onSelect={setActiveTag}
                  onAjouterPseudo={() => setModalOuverte(true)}
                />
              </Panneau>
            </div>

            <div className="flex min-h-0 flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-brume-900">Aperçus</h2>
                <span className="text-xs text-brume-500">le texte a faim de place</span>
              </div>
              <div className="grid flex-1 gap-4 md:grid-cols-2">
                <TexteApercu mode="masque" titre="Pseudonymisé">
                  {EXTRAITS.masque}
                </TexteApercu>
                <TexteApercu mode="lisible" titre="Lisible">
                  {EXTRAITS.lisible}
                </TexteApercu>
              </div>
            </div>
          </section>
        )}

        {/* Étape 3 : Récupérer */}
        {etape === 'recuperer' && (
          <section className="animate-fade-down" aria-label="Récupérer le document">
            <Panneau title="Votre document est prêt">
              <div className="flex flex-col items-start gap-5 p-6">
                <MessageSucces onFermer={() => setValide(false)}>
                  Rapport pseudonymisé — {fichier ?? 'rapport.docx'}
                </MessageSucces>
                <div className="w-full rounded-[14px] border border-brume-200/70 bg-brume-50 p-6">
                  <TexteApercu mode="lisible" titre="Résultat final">
                    {EXTRAITS.lisible}
                  </TexteApercu>
                </div>
                <div className="flex w-full justify-between gap-4">
                  <Bouton
                    variante="secondaire"
                    icone={<CleIcon />}
                    onClick={() => setEtape('verifier')}
                  >
                    Revenir à la vérification
                  </Bouton>
                  <Bouton variante="primaire" iconeDroite={<TelechargerIcon />}>
                    Télécharger
                  </Bouton>
                </div>
              </div>
            </Panneau>
          </section>
        )}
      </main>

      {/* Barre inférieure — toujours visible sur Vérifier */}
      {etape === 'verifier' && (
        <footer className="sticky bottom-4 mt-6 flex items-center justify-between gap-4 rounded-[14px] border border-brume-200/70 bg-white/95 px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur">
          <span className="inline-flex items-center gap-2 text-[13px] text-brume-500">
            <BouclierIcon className="size-4 text-signal-succes" /> 100 % local —
            rien ne quitte votre machine
          </span>
          <div className="flex items-center gap-3">
            {valide && <MessageSucces onFermer={() => setValide(false)}>Aucun conflit</MessageSucces>}
            <Bouton variante="secondaire" taille="sm" onClick={() => setEtape('deposer')}>
              Recommencer
            </Bouton>
            <Bouton
              taille="sm"
              iconeDroite={<TelechargerIcon />}
              onClick={() => {
                setValide(true)
                setEtape('recuperer')
              }}
            >
              Valider et télécharger
            </Bouton>
          </div>
        </footer>
      )}

      {/* Carte de confiance — footer */}
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-brume-200/70 pt-6 text-[13px] text-brume-500">
        <p>Open source — MIT — zéro collecte de données</p>
        <p className="flex items-center gap-1.5">
          <BouclierIcon className="size-4 text-signal-succes" />
          Le voile protège ce qui compte, sans se faire remarquer.
        </p>
      </footer>

      {/* Modale : ajout manuel d'un pseudo */}
      <ConfirmationDestructive
        ouvert={modalOuverte}
        onFermer={() => setModalOuverte(false)}
        onConfirmer={() => setModalOuverte(false)}
        message="Ajouter un pseudonyme"
        boutonConfirmer="Le nouveau tag sera ajouté au tableau et proposé lors des prochaines analyses."
        texteConfirmer="Ajouter"
      />
    </div>
  )
}