import React from "react";
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './reactroutes'
import './stylesheets/index.css'

const root = document.getElementById('root')
const app = createRoot(root)
const router = createBrowserRouter(routes)

app.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)