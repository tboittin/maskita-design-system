import type { Meta, StoryObj } from '@storybook/react'
import { Bouton } from '../../components/ui/Bouton'
import { ValiderIcon, VoileIcon, CleIcon, TelechargerIcon } from '../../components/icons'

const meta: Meta<typeof Bouton> = {
  title: 'UI/Bouton',
  component: Bouton,
  parameters: { layout: 'centered' },
  argTypes: {
    variante: {
      control: 'inline-radio',
      options: ['primaire', 'secondaire', 'ghost', 'danger'],
    },
    taille: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icone: { control: false },
    iconeDroite: { control: false },
    children: { control: 'text' },
  },
  args: {
    children: "Lancer l'analyse",
    variante: 'primaire',
    taille: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primaire: Story = {
  args: { children: "Lancer l'analyse" },
}

export const Secondaire: Story = {
  args: { variante: 'secondaire', children: 'Annuler' },
}

export const Ghost: Story = {
  args: { variante: 'ghost', children: 'Réinitialiser' },
}

export const Danger: Story = {
  args: { variante: 'danger', children: 'Retirer' },
}

export const Desactive: Story = {
  args: { disabled: true, children: 'Valider et télécharger' },
}

export const AvecIcônes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Bouton {...args} icone={<VoileIcon />}>
        Anonymiser
      </Bouton>
      <Bouton {...args} variante="secondaire" icone={<CleIcon />}>
        Restaurer
      </Bouton>
      <Bouton {...args} variante="primaire" iconeDroite={<TelechargerIcon />}>
        Télécharger
      </Bouton>
      <Bouton {...args} variante="ghost" iconeDroite={<ValiderIcon />}>
        Valider
      </Bouton>
    </div>
  ),
}

export const Tailles: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Bouton {...args} taille="sm">
        Petit
      </Bouton>
      <Bouton {...args} taille="md">
        Moyen
      </Bouton>
      <Bouton {...args} taille="lg">
        Grand
      </Bouton>
    </div>
  ),
}