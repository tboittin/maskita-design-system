import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/**
 * Build CSS du package : transforme src/style-entry.ts (qui importe
 * package.css = tokens Tailwind v4 + @font-face woff2) en dist/style.css
 * autonome et self-hosted (polices embarquées en base64).
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: 'src/style-entry.ts',
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      output: {
        // Le CSS doit sortir à la racine de dist/ (dist/style.css) :
        // tout asset non-css reste dans assets/
        assetFileNames: (info) => {
          if (info.name?.endsWith('.css')) return '[name][extname]'
          return 'assets/[name][extname]'
        },
      },
    },
  },
})