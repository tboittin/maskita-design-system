import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'brume',
      values: [
        { name: 'brume', value: '#f5f5f4' },
        { name: 'blanc', value: '#ffffff' },
        { name: 'brume-50', value: '#fafaf9' },
      ],
    },
    controls: {
      matchers: {
        color: /(couleur|couleurs|color|background)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
}

export default preview