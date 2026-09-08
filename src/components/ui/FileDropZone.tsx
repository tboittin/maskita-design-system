import { useState } from 'react'
import { FichierIcon, ValiderIcon, AttentionIcon } from '../icons'

interface FichierInfo {
  nom: string
  taille: string
  type: string
}

/**
 * FileDropZone — une invitation accueillante, pas un portique.
 * Zone en pointillés doux ; au survol/drag elle se teinte action-100.
 * Un fichier déposé devient une petite carte avec évaluation discrète du nom.
 */
export function FileDropZone({ onFichier }: { onFichier?: (info: FichierInfo) => void }) {
  const [fichier, setFichier] = useState<FichierInfo | null>(null)
  const [survol, setSurvol] = useState(false)
  const [extraction, setExtraction] = useState(false)

  const nomSuspect = fichier?.nom && /suspect|secret|0000|test_/i.test(fichier.nom) ? true : false

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0]
    if (!f) return
    const info = { nom: f.name, taille: formatTaille(f.size), type: f.type || 'fichier' }
    setFichier(info)
    onFichier?.(info)
    setExtraction(true)
    window.setTimeout(() => setExtraction(false), 1600)
  }

  return (
    <div>
      <label
        role="button"
        tabIndex={0}
        aria-label="Déposez votre rapport ici, ou choisissez un fichier"
        onDragOver={(e) => {
          e.preventDefault()
          setSurvol(true)
        }}
        onDragLeave={() => setSurvol(false)}
        onDrop={(e) => {
          e.preventDefault()
          setSurvol(false)
          handleFiles(e.dataTransfer.files)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            ;(e.currentTarget.querySelector('input') as HTMLInputElement)?.click()
          }
        }}
        className={`flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-[14px] border-[3px] border-dashed px-8 text-center transition-colors duration-[250ms] ${
          survol ? 'border-action-500 bg-action-100' : 'border-brume-300 bg-white hover:border-action-400 hover:bg-action-50'
        }`}
      >
        <input
          type="file"
          accept=".docx,.txt,.md"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="rounded-full bg-brume-100 p-3 text-brume-500">
          <FichierIcon className="size-6" />
        </span>
        <span className="text-[15px] font-medium text-brume-900">Déposez votre rapport ici</span>
        <span className="text-[13px] text-brume-500">tout reste sur votre machine</span>
        {nomSuspect && (
          <span className="inline-flex items-center gap-1.5 text-[13px] text-signal-attention animate-fade-in">
            <AttentionIcon className="size-4" /> Nom de fichier suspect — à renommer
          </span>
        )}
      </label>

      {fichier && (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-[14px] border border-brume-200/70 bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-fade-down">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 text-brume-500">
              <FichierIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-brume-900">{fichier.nom}</p>
              <p className="text-xs text-brume-500">
                {fichier.taille} · {fichier.type}
              </p>
            </div>
          </div>
          {extraction ? (
            <span className="inline-flex items-center gap-2 text-xs text-brume-500">
              <span className="size-2 rounded-full bg-action-500 animate-pulse-doux" />
              Extraction…
            </span>
          ) : nomSuspect ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal-attention">
              <AttentionIcon className="size-3.5" /> À renommer
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal-succes animate-check-apparition">
              <ValiderIcon className="size-3.5" /> Nom ok
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function formatTaille(octets: number): string {
  if (octets < 1024) return `${octets} o`
  if (octets < 1024 * 1024) return `${Math.round(octets / 1024)} Ko`
  return `${(octets / (1024 * 1024)).toFixed(1)} Mo`
}