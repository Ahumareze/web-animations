import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { paths } from './constants/paths'

export const routes = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.mouseTrail,
    element: <Home />
  },
])