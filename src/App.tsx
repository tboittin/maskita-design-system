import { Bouton, Jalons, Panneau, PastilleStatut, TexteApercu, SurbrillanceTag, MessageInfo, MessageSucces, FileDropZone, PseudoTableau } from './components/ui'
import { VoileIcon, BouclierIcon } from './components/ui'

const jalons = [
  { id: 'deposer', libelle: 'Déposer' },
  { id: 'verifier', libelle: 'Vérifier' },
  { id: 'recuperer', libelle: 'Récupérer' },
]

const lignes = [
  { tag: '[PERSONNE]', statut: 'nouveau' as const, valeurs: ['Jean Dupont', 'Mme Martin'] },
  { tag: '[ADRESSE]', statut: 'existant' as const, valeurs: ['12 rue des Lilas'] },
  { tag: '[EMAIL]', statut: 'conflit' as const, valeurs: ['j.dupont@mail.fr'], conflitMessage: 'Deux valeurs différentes pour un même tag.' },
  { tag: '[DATE]', statut: 'vide' as const, valeurs: [] },
]

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1100px] flex-col px-6 py-10">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-action-600">
            <VoileIcon className="size-7" />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-brume-900">Maskita</h1>
            <p className="text-[13px] text-brume-500">Design System — Le Voile léger</p>
          </div>
        </div>
        <Jalons etapes={jalons} active="verifier" />
      </header>

      <main className="flex flex-col gap-8">
        <section className="grid gap-6 lg:grid-cols-2">
          <Panneau title="Déposer">
            <div className="p-5">
              <FileDropZone />
            </div>
          </Panneau>
          <Panneau title="Vérifier">
            <div className="flex h-full flex-col gap-4 p-5">
              <MessageInfo>Voile posé sur 3 pseudonymes. Tout reste sur votre machine.</MessageInfo>
              <PseudoTableau lignes={lignes} activeTag="[PERSONNE]" onSelect={() => {}} />
            </div>
          </Panneau>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <TexteApercu mode="masque" titre="Pseudonymisé">
            <p>
              Bonjour <SurbrillanceTag actif>{lignes[0].tag}</SurbrillanceTag>, nous confirmons votre rendez-vous le{' '}
              <SurbrillanceTag actif={false}>[DATE]</SurbrillanceTag> à l'adresse{' '}
              <SurbrillanceTag actif={false}>[ADRESSE]</SurbrillanceTag>.
            </p>
          </TexteApercu>
          <TexteApercu mode="lisible" titre="Lisible">
            <p>
              Bonjour Jean Dupont, nous confirmons votre rendez-vous le 12 mars à l'adresse 12 rue des Lilas.
            </p>
          </TexteApercu>
        </section>

        <section className="flex flex-wrap items-center gap-4">
          <Bouton variante="primaire">Lancer l'analyse</Bouton>
          <Bouton variante="secondaire">Annuler</Bouton>
          <Bouton variante="ghost">Réinitialiser</Bouton>
          <Bouton variante="danger">Retirer</Bouton>
          <PastilleStatut statut="conflit" avecLibelle />
          <MessageSucces>3 pseudonymes enregistrés</MessageSucces>
        </section>
      </main>

      <footer className="mt-14 flex items-center justify-between border-t border-brume-200/70 pt-6 text-[13px] text-brume-500">
        <p>Open source — MIT — zéro collecte de données</p>
        <span className="inline-flex items-center gap-1.5">
          <BouclierIcon className="size-4 text-signal-succes" /> 100 % local
        </span>
      </footer>
    </div>
  )
}