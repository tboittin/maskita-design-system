import type { Meta, StoryObj } from '@storybook/react'
import { TexteApercu, SurbrillanceTag } from '../../components/ui/TexteApercu'

const meta: Meta<typeof TexteApercu> = {
  title: 'UI/TexteApercu',
  component: TexteApercu,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['masque', 'lisible'] },
    titre: { control: 'text' },
    toolbar: { control: false },
  },
  args: {
    mode: 'masque',
    titre: 'Pseudonymisé',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const texte = (
  <div className="space-y-4">
    <p>
      Bonjour <SurbrillanceTag actif>[PERSONNE]</SurbrillanceTag>, nous confirmons votre
      rendez-vous le <SurbrillanceTag actif={false}>[DATE]</SurbrillanceTag> à 14 h 30.
    </p>
    <p>
      L'adresse du cabinet : <SurbrillanceTag actif={false}>[ADRESSE]</SurbrillanceTag>.
      Merci de vous présenter avec votre pièce d'identité.
    </p>
    <p>
      Pour toute question, écrivez à <SurbrillanceTag actif={false}>[EMAIL]</SurbrillanceTag>.
    </p>
  </div>
)

export const ModeMasque: Story = {
  render: (args) => (
    <div className="h-[340px] w-[520px]">
      <TexteApercu {...args}>{texte}</TexteApercu>
    </div>
  ),
  args: { mode: 'masque', titre: 'Pseudonymisé' },
}

export const ModeLisible: Story = {
  render: (args) => (
    <div className="h-[340px] w-[520px]">
      <TexteApercu {...args}>
        <div className="space-y-4">
          <p>
            Bonjour Jean Dupont, nous confirmons votre rendez-vous le 12 mars à 14 h 30.
          </p>
          <p>L'adresse du cabinet : 12 rue des Lilas, 75011 Paris.</p>
          <p>Pour toute question, écrivez à j.dupont@mail.fr.</p>
        </div>
      </TexteApercu>
    </div>
  ),
  args: { mode: 'lisible', titre: 'Lisible' },
}