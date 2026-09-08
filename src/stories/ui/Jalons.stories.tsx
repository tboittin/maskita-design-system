import type { Meta, StoryObj } from '@storybook/react'
import { Jalons } from '../../components/ui/Jalons'

const meta: Meta<typeof Jalons> = {
  title: 'UI/Jalons',
  component: Jalons,
  parameters: { layout: 'centered' },
  argTypes: {
    onSelect: { control: false },
  },
  args: {
    etapes: [
      { id: 'deposer', libelle: 'Déposer' },
      { id: 'verifier', libelle: 'Vérifier' },
      { id: 'recuperer', libelle: 'Récupérer' },
    ],
    active: 'verifier',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SurLaDeuxiemeEtape: Story = {
  args: { active: 'verifier' },
}

export const PremiereEtape: Story = {
  args: { active: 'deposer' },
}

export const DerniereEtape: Story = {
  args: { active: 'recuperer' },
}

export const EtapesCliquables: Story = {
  args: { active: 'verifier', onSelect: (id) => console.log('retour vers', id) },
}