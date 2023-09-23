import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

import './style/index.css'

// file rearranged for reading clarity
const root = document.getElementById('root')
const app = createRoot(root)

const router = createBrowserRouter(routes)

// JR: browser router added to this file, to prevent unecessary rerenders of browser router context
app.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
