import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Onglets, PanneauOnglet } from '../../components/ui/Onglets'
import type { Onglet } from '../../components/ui/Onglets'

const ONGLETS_EXEMPLE: Onglet[] = [
  { id: 'pseudonymiser', libelle: 'Pseudonymiser' },
  { id: 'restaurer', libelle: 'Restaurer' },
  { id: 'parametres', libelle: 'Paramètres' },
]

function OngletsAvecPanneaux({ actif: actifInitial }: { actif?: string }) {
  const [actif, setActif] = useState(actifInitial ?? 'pseudonymiser')
  return (
    <div className="w-[600px]">
      <Onglets onglets={ONGLETS_EXEMPLE} actif={actif} onChange={setActif} />
      <div className="border border-t-0 border-brume-200 rounded-b-lg p-4 bg-white">
        <PanneauOnglet id="pseudonymiser" actif={actif === 'pseudonymiser'}>
          <p className="text-brume-700 text-sm">Contenu du panneau Pseudonymiser</p>
        </PanneauOnglet>
        <PanneauOnglet id="restaurer" actif={actif === 'restaurer'}>
          <p className="text-brume-700 text-sm">Contenu du panneau Restaurer</p>
        </PanneauOnglet>
        <PanneauOnglet id="parametres" actif={actif === 'parametres'}>
          <p className="text-brume-700 text-sm">Contenu du panneau Paramètres</p>
        </PanneauOnglet>
      </div>
    </div>
  )
}

const meta: Meta<typeof Onglets> = {
  title: 'UI/Onglets',
  component: Onglets,
  parameters: { layout: 'centered' },
  argTypes: {
    ariaLabel: { control: 'text' },
  },
  args: {
    onglets: ONGLETS_EXEMPLE,
    ariaLabel: 'Navigation par onglets',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ParDéfaut: Story = {
  args: {
    actif: 'pseudonymiser',
  },
  render: (args) => (
    <OngletsAvecPanneaux actif={args.actif} />
  ),
}

export const DeuxièmeOngletActif: Story = {
  args: {
    actif: 'restaurer',
  },
  render: (args) => (
    <OngletsAvecPanneaux actif={args.actif} />
  ),
}

export const DernierOngletActif: Story = {
  args: {
    actif: 'parametres',
  },
  render: (args) => (
    <OngletsAvecPanneaux actif={args.actif} />
  ),
}
