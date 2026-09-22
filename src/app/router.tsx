import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const HomePage = lazy(() => import('@/features/home/HomePage'))
const ProductsPage = lazy(() => import('@/features/products/ProductsPage'))
const NotFoundPage = lazy(() => import('@/features/home/NotFoundPage'))

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '*', element: <NotFoundPage /> },
])

export function AppRouter() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
