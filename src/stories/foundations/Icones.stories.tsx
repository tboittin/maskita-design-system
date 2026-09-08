import type { Meta, StoryObj } from '@storybook/react'
import {
  VoileIcon,
  CleIcon,
  TelechargerIcon,
  ValiderIcon,
  BouclierIcon,
  PlusIcon,
  FermerIcon,
  AttentionIcon,
  InfoIcon,
  FichierIcon,
  FilIcon,
  BrochetteIcon,
} from '../../components/icons'

const meta: Meta = {
  title: 'Fondations/Icônes',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

const Ligne = ({ nom, enfant }: { nom: string; enfant: React.ReactNode }) => (
  <div className="flex w-44 flex-col items-center gap-3 rounded-[14px] border border-brume-200/60 bg-white p-5">
    <span className="text-brume-700">{enfant}</span>
    <span className="font-donnees text-[11px] text-brume-500">{nom}</span>
  </div>
)

export const Jeu: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-wrap gap-4">
      <Ligne nom="BrochetteIcon — marque" enfant={<BrochetteIcon className="size-6" />} />
      <Ligne nom="VoileIcon" enfant={<VoileIcon className="size-6" />} />
      <Ligne nom="CleIcon" enfant={<CleIcon className="size-6" />} />
      <Ligne nom="TelechargerIcon" enfant={<TelechargerIcon className="size-6" />} />
      <Ligne nom="ValiderIcon" enfant={<ValiderIcon className="size-6" />} />
      <Ligne nom="BouclierIcon" enfant={<BouclierIcon className="size-6" />} />
      <Ligne nom="PlusIcon" enfant={<PlusIcon className="size-6" />} />
      <Ligne nom="FermerIcon" enfant={<FermerIcon className="size-6" />} />
      <Ligne nom="AttentionIcon" enfant={<AttentionIcon className="size-6" />} />
      <Ligne nom="InfoIcon" enfant={<InfoIcon className="size-6" />} />
      <Ligne nom="FichierIcon" enfant={<FichierIcon className="size-6" />} />
      <Ligne nom="FilIcon" enfant={<FilIcon className="size-6" />} />
    </div>
  ),
}

export const TailleEtCouleur: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <VoileIcon className="size-4 text-brume-700" />
      <VoileIcon className="size-6 text-brume-700" />
      <VoileIcon className="size-8 text-action-600" />
      <CleIcon className="size-8 text-signal-succes" />
      <AttentionIcon className="size-8 text-signal-erreur" />
    </div>
  ),
}