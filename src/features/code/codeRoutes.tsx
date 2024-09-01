import { lazy } from 'solid-js'

import genericRoutes from '../generic/genericRoutes'

export default {
  path: '/code',
  component: lazy(() => import('./CodeLayout')),
  children: genericRoutes,
}
