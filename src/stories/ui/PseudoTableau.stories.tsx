import type { Meta, StoryObj } from '@storybook/react'
import { PseudoTableau } from '../../components/ui/PseudoTableau'

const meta: Meta<typeof PseudoTableau> = {
  title: 'UI/PseudoTableau',
  component: PseudoTableau,
  parameters: { layout: 'centered' },
  argTypes: {
    onSelect: { control: false },
    onAjouterPseudo: { control: false },
  },
  args: {
    lignes: [
      { tag: '[PERSONNE]', statut: 'nouveau', valeurs: ['Jean Dupont', 'Mme Martin'] },
      { tag: '[ADRESSE]', statut: 'existant', valeurs: ['12 rue des Lilas'] },
      {
        tag: '[EMAIL]',
        statut: 'conflit',
        valeurs: ['j.dupont@mail.fr'],
        conflitMessage: 'Deux valeurs différentes pour un même tag.',
      },
      { tag: '[DATE]', statut: 'vide', valeurs: [] },
    ],
    activeTag: '[PERSONNE]',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Complet: Story = {
  render: (args) => (
    <div className="w-[380px] rounded-[14px] border border-brume-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <PseudoTableau {...args} onSelect={() => {}} />
    </div>
  ),
}

export const Vide: Story = {
  args: { lignes: [], activeTag: '' },
  render: (args) => (
    <div className="w-[380px] rounded-[14px] border border-brume-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <PseudoTableau {...args} onSelect={() => {}} />
    </div>
  ),
}