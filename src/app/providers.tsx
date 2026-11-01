import { useEffect, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { isFirebaseConfigured } from '@/lib/env'
import { useAuth } from '@/hooks/useAuth'

export function Providers({ children }: { children: ReactNode }) {
  const setAuthenticatedUser = useAuth((state) => state.setAuthenticatedUser)
  const logout = useAuth((state) => state.logout)
  const setAuthReady = useAuth((state) => state.setAuthReady)
  const setAuthError = useAuth((state) => state.setAuthError)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setAuthReady(true)
      return
    }

    let unsubscribe: (() => void) | undefined
    let cancelled = false

    void Promise.all([import('firebase/auth'), import('@/lib/firebase')])
      .then(([{ onAuthStateChanged }, { getFirebaseAuth }]) => {
        if (cancelled) return

        unsubscribe = onAuthStateChanged(
          getFirebaseAuth(),
          (user) => {
            if (user) {
              setAuthenticatedUser(user.displayName ?? '', user.email ?? '')
            } else {
              logout()
            }
            setAuthReady(true)
          },
          (error) => {
            setAuthError(`Could not restore your sign-in session: ${error.message}`)
            setAuthReady(true)
          },
        )
      })
      .catch((error: unknown) => {
        if (cancelled) return

        setAuthError(error instanceof Error ? error.message : 'Firebase could not be initialized.')
        setAuthReady(true)
      })

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [setAuthenticatedUser, logout, setAuthError, setAuthReady])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  )
}
