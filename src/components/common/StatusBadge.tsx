const toneMap: Record<string, string> = {
  Active: 'bg-success/10 text-success',
  Scheduled: 'bg-primary/10 text-primary',
  'In Progress': 'bg-warning/10 text-warning',
  Completed: 'bg-success/10 text-success',
  Review: 'bg-text-muted/10 text-text-muted',
  Paused: 'bg-text-muted/10 text-text-muted',
  Cancelled: 'bg-danger/10 text-danger',
  'Home Visit': 'bg-secondary/10 text-secondary',
  Paid: 'bg-success/10 text-success',
  Pending: 'bg-warning/10 text-warning',
  Overdue: 'bg-danger/10 text-danger',
  Trial: 'bg-warning/10 text-warning',
  Suspended: 'bg-danger/10 text-danger',
}

export function StatusBadge({ status }: { status: string }) {
  const classes = toneMap[status] ?? 'bg-text-muted/10 text-text-muted'
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${classes}`}
    >
      {status}
    </span>
  )
}
