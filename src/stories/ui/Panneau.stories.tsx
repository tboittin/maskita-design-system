import type { Meta, StoryObj } from '@storybook/react'
import { Panneau } from '../../components/ui/Panneau'
import { Bouton } from '../../components/ui/Bouton'

const meta: Meta<typeof Panneau> = {
  title: 'UI/Panneau',
  component: Panneau,
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    action: { control: false },
  },
  args: {
    title: 'Pseudonymes',
    children: (
      <div className="p-6">
        <p className="text-sm text-brume-500">
          Un panneau contient une section de travail. Ici, le contenu respire.
        </p>
      </div>
    ),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {}

export const AvecAction: Story = {
  args: {
    title: 'Déposer',
    action: (
      <Bouton variante="ghost" taille="sm">
        Réinitialiser
      </Bouton>
    ),
  },
}

export const SansTitre: Story = {
  args: { title: undefined },
}