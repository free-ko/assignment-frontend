import '@/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import reportWebVitals from '@/reportWebVitals'
import { PATHNAME } from '@/shared/constants/path'

const Home = lazy(() => import('@/pages/Home'))
const NFT = lazy(() => import('@/pages/NFT'))

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: PATHNAME.HOME,
        element: <Home />,
      },
      {
        path: PATHNAME.NFT,
        element: (
          <Suspense fallback="Loading">
            <NFT />
          </Suspense>
        ),
      },
    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 6 * 1000 * 5,
    },
  },
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
