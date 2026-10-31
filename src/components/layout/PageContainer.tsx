import type { ReactNode } from 'react'

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5">{children}</div>
}
