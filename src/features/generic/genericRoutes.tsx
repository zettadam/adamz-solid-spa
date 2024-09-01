import { lazy } from 'solid-js'

export default [
  {
    index: true,
    component: lazy(() => import('./IndexRoute')),
  },
  {
    path: 'archive',
    component: lazy(() => import('./archive/ArchiveLayout')),
    children: [
      {
        index: true,
        component: lazy(() => import('./archive/ArchiveIndexRoute')),
      },
      {
        path: ':year/:month/:day',
        component: lazy(() => import('./archive/DayRoute')),
      },
      {
        path: ':year/:month',
        component: lazy(() => import('./archive/MonthRoute')),
      },
      {
        path: ':year',
        component: lazy(() => import('./archive/YearRoute')),
      },
    ],
  },
  {
    path: 'detail/:id',
    component: lazy(() => import('./DetailRoute')),
  },
]
