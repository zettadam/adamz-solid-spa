// --- vendor imports ---------------------------------------------------------
import { lazy, type Component, type JSX } from 'solid-js'
import { MetaProvider } from '@solidjs/meta'
import { Route, Router } from '@solidjs/router'

// --- local imports ----------------------------------------------------------
import MainLayout from '~/features/MainLayout'
import PostsLayout from './features/posts/PostsLayout'
import NotesLayout from './features/notes/NotesLayout'
import CodeLayout from './features/code/CodeLayout'
import LabsLayout from './features/labs/LabsLayout'
import LinksLayout from './features/links/LinksLayout'
import EventsLayout from './features/events/EventsLayout'

import IndexRoute from './features/generic/IndexRoute'
import PageNotFound from './features/generic/PageNotFound'

import HomeRoute from './features/home/HomeRoute'

// --- style imports ----------------------------------------------------------
import './app.css'

// --- dynamic imports --------------------------------------------------------

// lazy generic routes
const ArchiveIndexRoute = lazy(
  () => import('./features/generic/archive/ArchiveIndexRoute'),
)
const DayRoute = lazy(() => import('./features/generic/archive/DayRoute'))
const MonthRoute = lazy(() => import('./features/generic/archive/MonthRoute'))
const YearRoute = lazy(() => import('./features/generic/archive/YearRoute'))

const TagIndexRoute = lazy(() => import('./features/generic/tag/TagIndexRoute'))
const TagRoute = lazy(() => import('./features/generic/tag/TagRoute'))

const ValueRangeIndexRoute = lazy(
  () => import('./features/generic/value/ValueRangeIndexRoute'),
)
const ValueRangeRoute = lazy(
  () => import('./features/generic/value/ValueRangeRoute'),
)
const SearchRoute = lazy(() => import('./features/generic/SearchRoute'))
const DetailRoute = lazy(() => import('./features/generic/DetailRoute'))

// --- end of imports ---------------------------------------------------------

const App: Component = (): JSX.Element => {
  return (
    <MetaProvider>
      <Router root={MainLayout}>
        <Route path="/posts" component={PostsLayout}>
          <Route path="/archive">
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/search">
            <Route path="/:query/:page" component={SearchRoute} />
            <Route path="/:query" component={SearchRoute} />
            <Route path="/" component={SearchRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/notes" component={NotesLayout}>
          <Route path="/archive">
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/search">
            <Route path="/:query/:page" component={SearchRoute} />
            <Route path="/:query" component={SearchRoute} />
            <Route path="/" component={SearchRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/code" component={CodeLayout}>
          <Route path="/archive">
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/search">
            <Route path="/:query/:page" component={SearchRoute} />
            <Route path="/:query" component={SearchRoute} />
            <Route path="/" component={SearchRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/labs" component={LabsLayout}>
          <Route path="/archive">
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/search">
            <Route path="/:query/:page" component={SearchRoute} />
            <Route path="/:query" component={SearchRoute} />
            <Route path="/" component={SearchRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/links" component={LinksLayout}>
          <Route path="/archive">
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/tags">
            <Route path="/:tag/:page" component={TagRoute} />
            <Route path="/:tag" component={TagRoute} />
            <Route path="/" component={TagIndexRoute} />
          </Route>
          <Route path="/value">
            <Route path="/:value/:page" component={ValueRangeRoute} />
            <Route path="/:value" component={ValueRangeRoute} />
            <Route path="/" component={ValueRangeIndexRoute} />
          </Route>
          <Route path="/search">
            <Route path="/:query/:page" component={SearchRoute} />
            <Route path="/:query" component={SearchRoute} />
            <Route path="/" component={SearchRoute} />
          </Route>
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/events" component={EventsLayout}>
          <Route path="/archive">
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/search">
            <Route path="/:query/:page" component={SearchRoute} />
            <Route path="/:query" component={SearchRoute} />
            <Route path="/" component={SearchRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/" component={HomeRoute} />
        <Route path="*404" component={PageNotFound} />
      </Router>
    </MetaProvider>
  )
}

export default App
