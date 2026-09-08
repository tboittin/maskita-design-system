import type { Meta, StoryObj } from '@storybook/react'
import { PastilleStatut } from '../../components/ui/PastilleStatut'

const meta: Meta<typeof PastilleStatut> = {
  title: 'UI/Pastille de statut',
  component: PastilleStatut,
  parameters: { layout: 'centered' },
  argTypes: {
    statut: {
      control: 'inline-radio',
      options: ['nouveau', 'existant', 'conflit', 'vide', 'sain'],
    },
    avecLibelle: { control: 'boolean' },
  },
  args: { statut: 'nouveau', avecLibelle: true },
}

export default meta
type Story = StoryObj<typeof meta>

export const TousLesStatuts: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(['nouveau', 'existant', 'conflit', 'vide', 'sain'] as const).map((s) => (
        <div key={s} className="flex items-center gap-3">
          <span className="w-24 text-sm text-brume-500">{s}</span>
          <PastilleStatut statut={s} avecLibelle />
        </div>
      ))}
    </div>
  ),
}

export const AvecLibelle: Story = {
  args: { statut: 'conflit', avecLibelle: true },
}

export const PastilleSeule: Story = {
  args: { statut: 'nouveau', avecLibelle: false },
}