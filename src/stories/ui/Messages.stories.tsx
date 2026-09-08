import type { Meta, StoryObj } from '@storybook/react'
import { MessageSucces, MessageErreur, MessageInfo } from '../../components/ui/Messages'
import { Bouton } from '../../components/ui/Bouton'

const meta: Meta<typeof MessageSucces> = {
  title: 'UI/Messages',
  parameters: { layout: 'centered' },
  argTypes: {
    onFermer: { control: false },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj

export const Succes: Story = {
  render: (args) => (
    <MessageSucces onFermer={() => {}}>{args.children ?? '3 pseudonymes enregistrés'}</MessageSucces>
  ),
}

export const Erreur: Story = {
  render: (args) => (
    <MessageErreur>
      {args.children ??
        "Ce format n'est pas pris en charge. Utilisez .docx, .txt ou .md."}
    </MessageErreur>
  ),
}

export const Info: Story = {
  render: (args) => (
    <MessageInfo>
      {args.children ?? 'Voile posé sur 3 pseudonymes. Tout reste sur votre machine.'}
    </MessageInfo>
  ),
}

export const ErreurAvecAction: Story = {
  render: (args: { children?: React.ReactNode }) => (
    <div className="flex flex-col items-start gap-3">
      <MessageErreur>
        {args.children ??
          'Ce fichier contient un nom suspect dans son titre.'}
      </MessageErreur>
      <Bouton variante="secondaire" taille="sm">
        Renommer puis redéposer
      </Bouton>
    </div>
  ),
}