import type { ReactNode } from 'react'

/**
 * Aperçu de document — police de lecture serif, surbrillances en voile doux.
 * tag actif = fond action-100 + bordure gauche 2px action.
 */
export function TexteApercu({
  mode,
  titre,
  children,
  toolbar,
}: {
  mode: 'masque' | 'lisible'
  titre: string
  children: ReactNode
  toolbar?: ReactNode
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[14px] border border-brume-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <header className="flex items-center justify-between border-b border-brume-200/60 px-5 py-3">
        <span className="text-xs font-medium uppercase tracking-wide text-brume-500">{titre}</span>
        <span className="text-[11px] text-brume-300">{mode === 'masque' ? 'voile posé' : 'voile relevé'}</span>
      </header>
      {toolbar && <div className="absolute right-5 top-12 z-10">{toolbar}</div>}
      <div className="flex-1 overflow-y-auto px-10 py-8 font-lecture text-[16px] leading-[1.7] text-brume-900">
        {children}
      </div>
    </div>
  )
}

export function SurbrillanceTag({ actif, children }: { actif: boolean; children: ReactNode }) {
  return (
    <mark
      className={`rounded px-1 py-0.5 font-donnees text-[0.86em] ${
        actif
          ? 'border-l-2 border-l-action-500 bg-action-100 text-brume-900'
          : 'bg-signal-succes/10 text-brume-900'
      }`}
    >
      {children}
    </mark>
  )
}