export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  )
}
