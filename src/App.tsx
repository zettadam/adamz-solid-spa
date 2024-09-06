// --- vendor imports ---------------------------------------------------------
import { type Component, type JSX, lazy } from 'solid-js'
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
import ArchiveLayout from './features/generic/archive/ArchiveLayout'

import IndexRoute from './features/generic/IndexRoute'
import PageNotFound from './features/generic/PageNotFound'

import HomeRoute from './features/home/HomeRoute'

// --- style imports ----------------------------------------------------------
import './app.css'

// --- dynamic imports --------------------------------------------------------

// lazy generic routes
const DetailRoute = lazy(() => import('./features/generic/DetailRoute'))
const ArchiveIndexRoute = lazy(
  () => import('./features/generic/archive/ArchiveIndexRoute'),
)
const DayRoute = lazy(() => import('./features/generic/archive/DayRoute'))
const MonthRoute = lazy(() => import('./features/generic/archive/MonthRoute'))
const YearRoute = lazy(() => import('./features/generic/archive/YearRoute'))

// --- end of imports ---------------------------------------------------------

const App: Component = (): JSX.Element => {
  return (
    <MetaProvider>
      <Router root={MainLayout}>
        <Route path="/posts" component={PostsLayout}>
          <Route path="/archive" component={ArchiveLayout}>
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/notes" component={NotesLayout}>
          <Route path="/archive" component={ArchiveLayout}>
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/code" component={CodeLayout}>
          <Route path="/archive" component={ArchiveLayout}>
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/labs" component={LabsLayout}>
          <Route path="/archive" component={ArchiveLayout}>
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/links" component={LinksLayout}>
          <Route path="/archive" component={ArchiveLayout}>
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
          </Route>
          <Route path="/detail/:id" component={DetailRoute} />
          <Route path="/:page" component={IndexRoute} />
          <Route path="/" component={IndexRoute} />
        </Route>

        <Route path="/events" component={EventsLayout}>
          <Route path="/archive" component={ArchiveLayout}>
            <Route path="/:year/:month/:day" component={DayRoute} />
            <Route path="/:year/:month" component={MonthRoute} />
            <Route path="/:year" component={YearRoute} />
            <Route path="/" component={ArchiveIndexRoute} />
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
