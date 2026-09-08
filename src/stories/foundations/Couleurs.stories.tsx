import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Fondations/Couleurs',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

const Echantillon = ({ nom, hex, classe }: { nom: string; hex: string; classe: string }) => (
  <div className="flex flex-col gap-2">
    <div className={`h-20 w-40 rounded-[14px] border border-brume-200/60 ${classe}`} />
    <p className="font-donnees text-xs text-brume-700">{nom}</p>
    <p className="font-donnees text-[11px] text-brume-500">{hex}</p>
  </div>
)

export const Brume: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Echantillon nom="brume-950" hex="#1c1917" classe="bg-brume-950" />
      <Echantillon nom="brume-900" hex="#292524" classe="bg-brume-900" />
      <Echantillon nom="brume-700" hex="#44403c" classe="bg-brume-700" />
      <Echantillon nom="brume-500" hex="#78716c" classe="bg-brume-500" />
      <Echantillon nom="brume-300" hex="#d6d3d1" classe="bg-brume-300" />
      <Echantillon nom="brume-200" hex="#e7e5e4" classe="bg-brume-200" />
      <Echantillon nom="brume-100" hex="#f5f5f4" classe="bg-brume-100 border" />
      <Echantillon nom="brume-50" hex="#fafaf9" classe="bg-brume-50 border" />
    </div>
  ),
}

export const Action: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Echantillon nom="action-600 — primaire" hex="#5b5bd6" classe="bg-action-600" />
      <Echantillon nom="action-500 — hover" hex="#6d6de0" classe="bg-action-500" />
      <Echantillon nom="action-400" hex="#8b8be8" classe="bg-action-400" />
      <Echantillon nom="action-100 — fond sélection" hex="#eef1ff" classe="bg-action-100 border" />
    </div>
  ),
}

export const Signal: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <Echantillon nom="signal-succes" hex="#3f9142" classe="bg-signal-succes" />
      <Echantillon nom="signal-erreur" hex="#c4453c" classe="bg-signal-erreur" />
      <Echantillon nom="signal-attention" hex="#b47a2f" classe="bg-signal-attention" />
      <Echantillon nom="signal-info" hex="#4a72b8" classe="bg-signal-info" />
    </div>
  ),
}

export const RegleDor: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="grid min-h-screen place-items-center bg-brume-100 p-10">
      <div className="max-w-2xl rounded-[14px] bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <p className="mb-3 text-lg font-semibold text-brume-900">La couleur ne décore pas, elle informe.</p>
        <p className="text-sm leading-relaxed text-brume-500">
          Tout le reste reste en brume — le calme est la norme, la couleur est l'exception.
          Seuls les états (tags, statuts), l'action primaire et les erreurs portent une teinte.
        </p>
      </div>
    </div>
  ),
}