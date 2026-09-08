import type { ReactNode } from 'react'

export function Panneau({
  title,
  action,
  children,
  className = '',
  ariaLabel,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <section
      aria-label={ariaLabel ?? title}
      className={`rounded-[14px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-brume-200/70 ${className}`}
    >
      {title && (
        <header className="flex items-center justify-between gap-4 border-b border-brume-200/60 px-6 py-4">
          <h2 className="font-ui text-[15px] font-semibold text-brume-900">{title}</h2>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}