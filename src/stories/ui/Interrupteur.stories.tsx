import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Interrupteur } from '../../components/ui/Interrupteur'
import type { InterrupteurProps } from '../../components/ui/Interrupteur'
import { FichierIcon } from '../../components/icons'

function InterrupteurAvecEtat(props: InterrupteurProps) {
  const [actif, setActif] = useState(props.actif)
  return <Interrupteur {...props} actif={actif} onChange={setActif} />
}

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
    ariaLabel: 'Sélectionner le format d\'export',
    actif: false,
    children: 'Format DOCX',
  },
  render: (args) => <InterrupteurAvecEtat {...args} />,
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
    icone: <FichierIcon />,
    children: 'Format PDF',
  },
}

export const Désactivé: Story = {
  args: {
    desactive: true,
    children: 'DOCX indisponible',
  },
}
