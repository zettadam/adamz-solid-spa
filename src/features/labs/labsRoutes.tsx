import { lazy } from 'solid-js'

import genericRoutes from '../generic/genericRoutes'

export default {
  path: '/labs',
  component: lazy(() => import('./LabsLayout')),
  children: genericRoutes,
}
