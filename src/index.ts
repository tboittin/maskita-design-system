// ═══════════════════════════════════════════════════════════════
// Maskita Design System — Point d'entrée public
// ═══════════════════════════════════════════════════════════════

// Composants UI
export { Bouton } from './components/ui/Bouton'
export type { BoutonProps, VarianteBouton, TailleBouton } from './components/ui/Bouton'
export { PastilleStatut } from './components/ui/PastilleStatut'
export { Panneau } from './components/ui/Panneau'
export { Jalons } from './components/ui/Jalons'
export type { EtapeJalon } from './components/ui/Jalons'
export { Modal, ConfirmationDestructive } from './components/ui/Modal'
export { FileDropZone } from './components/ui/FileDropZone'
export type { FileDropZoneProps } from './components/ui/FileDropZone'
export { PseudoTableau, LigneTag } from './components/ui/PseudoTableau'
export type { LignePseudo, LigneTagProps } from './components/ui/PseudoTableau'
export { TexteApercu, SurbrillanceTag } from './components/ui/TexteApercu'
export { MessageSucces, MessageErreur, MessageInfo } from './components/ui/Messages'

// Statuts
export { statuts } from './lib/statuts'
export type { ToneStatut } from './lib/statuts'

// Icônes (marque + gestes)
export {
  BrochetteIcon,
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
} from './components/icons'
export type { IconProps } from './components/icons'