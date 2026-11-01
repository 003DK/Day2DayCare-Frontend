import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { MainLayout } from '@/components/layout/MainLayout'
import { physioCareRoutes } from '@/routes/AppRoutes'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

const LoginPage = lazy(() => import('@/features/auth/LoginPage'))
const HomePage = lazy(() => import('@/features/home/HomePage'))
const ProductsPage = lazy(() => import('@/features/products/ProductsPage'))
const BranchAdminPage = lazy(() => import('@/features/branch-admin/BranchAdminPage'))
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'))
const NotFoundPage = lazy(() => import('@/features/home/NotFoundPage'))

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authReady, isAuthenticated } = useAuth()

  if (!authReady) {
    return <LoadingSpinner label="Checking your sign-in..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

const router = createBrowserRouter(
  [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    {
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [...physioCareRoutes],
    },
    { path: '/home', element: <HomePage /> },
    { path: '/products', element: <ProductsPage /> },
    { path: '/branch-admin', element: <BranchAdminPage /> },
    { path: '/legacy-settings', element: <SettingsPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
  {
    basename: '/Day2DayCare-Frontend',
  },
)

export function AppRouter() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
