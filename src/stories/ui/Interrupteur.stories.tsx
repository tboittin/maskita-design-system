import type { Meta, StoryObj } from '@storybook/react'
import { Interrupteur } from '../../components/ui/Interrupteur'
import { VoileIcon } from '../../components/icons'

const meta: Meta<typeof Interrupteur> = {
  title: 'UI/Interrupteur',
  component: Interrupteur,
  parameters: { layout: 'centered' },
  argTypes: {
    actif: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    desactive: { control: 'boolean' },
    icone: { control: false },
    children: { control: 'text' },
  },
  args: {
    ariaLabel: 'Activer le mode renforcé',
    actif: false,
    children: 'Accessibilité renforcée',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Inactif: Story = {
  args: { actif: false },
}

export const Actif: Story = {
  args: { actif: true },
}

export const AvecIcône: Story = {
  args: {
    actif: true,
    icone: <VoileIcon />,
    children: 'Mode protégé',
  },
}

export const Désactivé: Story = {
  args: {
    desactive: true,
    children: 'Option indisponible',
  },
}

export const SansLibellé: Story = {
  args: {
    children: undefined,
    ariaLabel: 'Basculer le mode sombre',
    actif: false,
  },
}
