import { lazy } from 'solid-js'

import genericRoutes from '../generic/genericRoutes'

export default {
  path: '/posts',
  component: lazy(() => import('./PostsLayout')),
  children: genericRoutes,
}
