import type { Meta, StoryObj } from '@storybook/react'
import { FileDropZone } from '../../components/ui/FileDropZone'

const meta: Meta<typeof FileDropZone> = {
  title: 'UI/FileDropZone',
  component: FileDropZone,
  parameters: { layout: 'centered' },
  argTypes: {
    onFichier: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Invitation: Story = {}

export const AvecRappel: Story = {
  render: () => (
    <div className="w-[520px]">
      <FileDropZone onFichier={() => {}} />
      <p className="mt-3 text-xs text-brume-500">
        Formats pris en charge : .docx, .txt, .md — tout reste sur votre machine.
      </p>
    </div>
  ),
}