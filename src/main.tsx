import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './libs/query-client.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
