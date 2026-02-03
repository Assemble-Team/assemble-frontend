import { useDialog } from './Dialog';

export default function DialogOverlay() {
  const { onClose } = useDialog();

  return <div onClick={onClose} className="fixed inset-0 z-50 bg-black/40" />;
}
