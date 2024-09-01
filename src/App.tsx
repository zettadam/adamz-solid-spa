import { type Component, type JSX, lazy } from 'solid-js'
import { Router } from '@solidjs/router'

import codeRoutes from './features/code/codeRoutes'
import eventsRoutes from './features/events/eventsRoutes'
import labsRoutes from './features/labs/labsRoutes'
import linksRoutes from './features/links/linksRoutes'
import notesRoutes from './features/notes/notesRoutes'
import postsRoutes from './features/posts/postsRoutes'

import './app.css'

const routes = [
  {
    path: '/',
    component: lazy(() => import('~/features/MainLayout')),
    children: [
      {
        index: true,
        component: lazy(() => import('~/features/home/HomeRoute')),
      },
      codeRoutes,
      eventsRoutes,
      labsRoutes,
      linksRoutes,
      notesRoutes,
      postsRoutes,
    ],
  },
]

const App: Component = (): JSX.Element => {
  return <Router>{routes}</Router>
}

export default App
