const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

export function Avatar({
  src,
  name,
  size = 'md',
}: {
  src?: string
  name: string
  size?: keyof typeof sizeMap
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeMap[size]} shrink-0 rounded-full border-2 border-white/80 object-cover shadow-sm`}
      />
    )
  }

  return (
    <div
      className={`${sizeMap[size]} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary font-bold text-white`}
    >
      {initials}
    </div>
  )
}
