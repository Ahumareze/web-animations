import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { paths } from './constants/paths'
import MouseTrail from './pages/mouseTrail/MouseTrail'

export const routes = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.mouseTrail,
    element: <MouseTrail />
  },
])