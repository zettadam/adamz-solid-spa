import { lazy } from 'solid-js'

import genericRoutes from '../generic/genericRoutes'

export default {
  path: '/notes',
  component: lazy(() => import('./NotesLayout')),
  children: genericRoutes,
}
