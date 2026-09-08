import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal, ConfirmationDestructive } from '../../components/ui/Modal'
import { Bouton } from '../../components/ui/Bouton'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  argTypes: {
    ouvert: { control: 'boolean' },
    titre: { control: 'text' },
    onFermer: { control: false },
    pied: { control: false },
  },
  args: {
    ouvert: true,
    titre: 'Retirer les valeurs du tag',
    children: (
      <p className="text-sm leading-relaxed text-brume-500">
        Les valeurs de [EMAIL] seront retirées du tag. Cette action est
        réversible tant que vous n'avez pas téléchargé le fichier.
      </p>
    ),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: (args) => (
    <Modal
      ouvert={args.ouvert ?? true}
      titre={args.titre ?? 'Retirer les valeurs du tag'}
      onFermer={() => {}}
    >
      {args.children}
    </Modal>
  ),
}

export const Interactive: Story = {
  render: function Interactive() {
    const [ouvert, setOuvert] = useState(false)
    return (
      <div>
        <Bouton onClick={() => setOuvert(true)}>Ouvrir la modale</Bouton>
        <Modal
          ouvert={ouvert}
          titre="Retirer les valeurs du tag"
          onFermer={() => setOuvert(false)}
          pied={
            <>
              <Bouton variante="secondaire" onClick={() => setOuvert(false)}>
                Annuler
              </Bouton>
              <Bouton variante="danger" onClick={() => setOuvert(false)}>
                Retirer
              </Bouton>
            </>
          }
        >
          <p className="text-sm leading-relaxed text-brume-500">
            Les valeurs de [EMAIL] seront retirées du tag. Cette action est
            réversible tant que vous n'avez pas téléchargé le fichier.
          </p>
        </Modal>
      </div>
    )
  },
}

export const ConfirmationDestructiveStory: Story = {
  name: 'Confirmation destructive',
  render: function ConfirmationDestructiveDemo() {
    const [ouvert, setOuvert] = useState(false)
    return (
      <div>
        <Bouton variante="danger" onClick={() => setOuvert(true)}>
          Retirer le tag
        </Bouton>
        <ConfirmationDestructive
          ouvert={ouvert}
          onFermer={() => setOuvert(false)}
          onConfirmer={() => {
            setOuvert(false)
          }}
          message="Les valeurs de [EMAIL] seront retirées du tag"
          boutonConfirmer="Elles ne seront plus proposées lors des prochaines analyses. Vous pourrez les retrouver dans le fichier original."
          texteConfirmer="Retirer"
        />
      </div>
    )
  },
}