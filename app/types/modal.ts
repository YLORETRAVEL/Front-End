
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut?: () => void;
}


export interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}