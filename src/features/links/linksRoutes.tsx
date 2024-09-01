import { lazy } from 'solid-js'

import genericRoutes from '../generic/genericRoutes'

export default {
  path: '/links',
  component: lazy(() => import('./LinksLayout')),
  children: genericRoutes,
}
