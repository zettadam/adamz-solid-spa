import { lazy } from 'solid-js'

import genericRoutes from '../generic/genericRoutes'

export default {
  path: '/events',
  component: lazy(() => import('./EventsLayout')),
  children: genericRoutes,
}
