import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FermerIcon } from '../icons'
import { Bouton } from './Bouton'

interface ModalProps {
  ouvert: boolean
  titre: string
  onFermer: () => void
  children: ReactNode
  pied?: ReactNode
}

/**
 * Modale Maskita — angles 20px, ombre diffuse, focus trap,
 * retour focus à l'élément déclencheur, Escape ferme.
 */
export function Modal({ ouvert, titre, onFermer, children, pied }: ModalProps) {
  const declencheurRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (ouvert) {
      declencheurRef.current = document.activeElement as HTMLElement | null
      const precedent = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = precedent
        declencheurRef.current?.focus?.()
      }
    }
  }, [ouvert])

  if (!ouvert) return null

  const fermerAvecEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onFermer()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onKeyDown={fermerAvecEscape}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-brume-900/30 animate-fade-in"
        onClick={onFermer}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        tabIndex={-1}
        className="relative w-full max-w-[480px] rounded-[20px] border border-brume-200/70 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-fade-down focus:outline-none"
        autoFocus={false}
      >
        <header className="flex items-center justify-between px-7 pt-6">
          <h2 className="text-lg font-semibold text-brume-900">{titre}</h2>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="rounded-lg p-1.5 text-brume-500 transition-colors hover:bg-brume-100 hover:text-brume-900"
          >
            <FermerIcon className="size-5" />
          </button>
        </header>
        <div className="px-7 py-5">{children}</div>
        {pied && <footer className="flex justify-end gap-3 px-7 pb-7">{pied}</footer>}
      </div>
    </div>,
    document.body,
  )
}

export function ConfirmationDestructive({
  ouvert,
  onFermer,
  onConfirmer,
  message,
  boutonConfirmer,
  texteConfirmer,
}: {
  ouvert: boolean
  onFermer: () => void
  onConfirmer: () => void
  message: string
  boutonConfirmer: string
  texteConfirmer: string
}) {
  return (
    <Modal
      ouvert={ouvert}
      titre={message}
      onFermer={onFermer}
      pied={
        <>
          <Bouton variante="secondaire" onClick={onFermer}>
            Annuler
          </Bouton>
          <Bouton variante="danger" onClick={onConfirmer}>
            {texteConfirmer}
          </Bouton>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-brume-500">
        {boutonConfirmer}
      </p>
    </Modal>
  )
}