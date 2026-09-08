import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Fondations/Typographie',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

export const Familles: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-8 bg-white p-8">
      <div>
        <p className="font-donnees mb-1 text-xs text-brume-500">UI — Inter (400/500/600)</p>
        <p className="font-ui text-2xl font-semibold text-brume-900">Le voile léger</p>
        <p className="font-ui text-sm text-brume-700">
          L'interface : simple, discrète, bienveillante. Une phrase claire à la fois.
        </p>
      </div>
      <div>
        <p className="font-donnees mb-1 text-xs text-brume-500">Lecture — Source Serif 4 (serif douce)</p>
        <p className="font-lecture text-xl leading-[1.7] text-brume-900">
          Le rapport garde son caractère de document, mais la lecture reste agréable,
          jamais intimidante.
        </p>
      </div>
      <div>
        <p className="font-donnees mb-1 text-xs text-brume-500">Données — JetBrains Mono</p>
        <p className="font-donnees text-sm text-brume-900">
          {'[PERSONNE] Jean Dupont'} <span className="text-brume-500">— le mono dit « donnée protégée ».</span>
        </p>
      </div>
    </div>
  ),
}

export const Echelle: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-white p-8">
      <p className="font-ui text-4xl font-semibold text-brume-900">28 — Titre de page</p>
      <p className="font-ui text-[23px] font-semibold text-brume-900">23 — Titre de panneau</p>
      <p className="font-ui text-[19px] font-semibold text-brume-900">19 — Sous-titre</p>
      <p className="font-ui text-[16px] text-brume-700">16 — Corps de texte, interligne 1.7</p>
      <p className="font-ui text-[13px] text-brume-500">13 — Texte secondaire</p>
      <p className="font-ui text-xs text-brume-500">12 — Légendes et métadonnées</p>
    </div>
  ),
}

export const Mesure: Story = {
  render: () => (
    <div className="max-w-[65ch] bg-white p-8 font-lecture text-[16px] leading-[1.7] text-brume-900">
      <p>
        La mesure de texte reste entre 60 et 70 caractères : la lecture est confortable
        même sur les longs rapports. Le texte est le produit — on lui donne la place
        qu'il mérite, sans jamais le comprimer.
      </p>
    </div>
  ),
}