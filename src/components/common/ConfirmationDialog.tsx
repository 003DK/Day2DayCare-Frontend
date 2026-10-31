import { Modal } from './Modal'

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  danger = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-text-muted">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold text-text-muted"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm ${
            danger ? 'bg-danger' : 'bg-gradient-to-br from-primary to-secondary'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
