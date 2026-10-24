import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const ProductsPage = lazy(() => import('@/features/products/ProductsPage'))
const BranchAdminPage = lazy(() => import('@/features/branch-admin/BranchAdminPage'))
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'))
const NotFoundPage = lazy(() => import('@/features/home/NotFoundPage'))

const router = createBrowserRouter(
  [
    { path: '/', element: <HomePage /> },
    { path: '/products', element: <ProductsPage /> },
    { path: '/branch-admin', element: <BranchAdminPage /> },
    { path: '/settings', element: <SettingsPage /> },
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
