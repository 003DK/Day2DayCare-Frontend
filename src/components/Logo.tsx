export function Logo({ withText = true, size = 32 }: { withText?: boolean; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="var(--color-primary)" />
        <path d="M20 10v20M10 20h20" stroke="white" strokeWidth="5" strokeLinecap="round" />
      </svg>
      {withText && (
        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)' }}>
          Day2Day <span style={{ color: 'var(--color-primary)' }}>CARE</span>
        </span>
      )}
    </div>
  )
}
