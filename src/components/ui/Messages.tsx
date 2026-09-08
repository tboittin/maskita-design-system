import type { ReactNode } from 'react'
import { ValiderIcon, AttentionIcon, InfoIcon } from '../icons'

/**
 * Succès : petit ✓ vert + message, fondu, disparaît à 5 s ou au clic.
 * Erreur : fond blanc, bordure rouge douce, une phrase claire.
 */
export function MessageSucces({ children, onFermer }: { children: ReactNode; onFermer?: () => void }) {
  return (
    <button
      type="button"
      onClick={onFermer}
      className="inline-flex items-center gap-2 rounded-[8px] bg-signal-succes-fond px-3 py-2 text-[13px] font-medium text-signal-succes animate-fade-in"
    >
      <ValiderIcon className="size-4" />
      {children}
    </button>
  )
}

export function MessageErreur({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="inline-flex items-start gap-2.5 rounded-[14px] border border-signal-erreur/30 bg-white px-4 py-3 text-sm text-brume-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-fade-in"
    >
      <AttentionIcon className="mt-0.5 size-4 shrink-0 text-signal-erreur" />
      <div>{children}</div>
    </div>
  )
}

export function MessageInfo({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-start gap-2.5 rounded-[14px] bg-signal-info-fond px-4 py-3 text-sm text-brume-900">
      <InfoIcon className="mt-0.5 size-4 shrink-0 text-signal-info" />
      <div>{children}</div>
    </div>
  )
}