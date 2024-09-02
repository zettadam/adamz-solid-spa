import { type Component, type JSX, lazy } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import MainLayout from '~/features/MainLayout'

import './app.css'

const HomeRoute = lazy(() => import('./features/home/HomeRoute'))
const PostsLayout = lazy(() => import('./features/posts/PostsLayout'))
const NotesLayout = lazy(() => import('./features/notes/NotesLayout'))
const LabsLayout = lazy(() => import('./features/labs/LabsLayout'))
const LinksLayout = lazy(() => import('./features/links/LinksLayout'))
const CodeLayout = lazy(() => import('./features/code/CodeLayout'))
const EventsLayout = lazy(() => import('./features/events/EventsLayout'))

// generic routes
const IndexRoute = lazy(() => import('./features/generic/IndexRoute'))
const DetailRoute = lazy(() => import('./features/generic/DetailRoute'))
const ArchiveLayout = lazy(
  () => import('./features/generic/archive/ArchiveLayout'),
)
const ArchiveIndexRoute = lazy(
  () => import('./features/generic/archive/ArchiveIndexRoute'),
)
const DayRoute = lazy(() => import('./features/generic/archive/DayRoute'))
const MonthRoute = lazy(() => import('./features/generic/archive/MonthRoute'))
const YearRoute = lazy(() => import('./features/generic/archive/YearRoute'))

const App: Component = (): JSX.Element => {
  return (
    <Router root={MainLayout}>
      <Route path="/posts" component={PostsLayout}>
        <Route path="/archive" component={ArchiveLayout}>
          <Route path="/:year/:month/:day" component={DayRoute} />
          <Route path="/:year/:month" component={MonthRoute} />
          <Route path="/:year" component={YearRoute} />
          <Route path="/" component={ArchiveIndexRoute} />
        </Route>
        <Route path="/detail/:slug" component={DetailRoute} />
        <Route path="/" component={IndexRoute} />
      </Route>

      <Route path="/notes" component={NotesLayout}>
        <Route path="/archive" component={ArchiveLayout}>
          <Route path="/:year/:month/:day" component={DayRoute} />
          <Route path="/:year/:month" component={MonthRoute} />
          <Route path="/:year" component={YearRoute} />
          <Route path="/" component={ArchiveIndexRoute} />
        </Route>
        <Route path="/detail/:slug" component={DetailRoute} />
        <Route path="/" component={IndexRoute} />
      </Route>

      <Route path="/code" component={CodeLayout}>
        <Route path="/archive" component={ArchiveLayout}>
          <Route path="/:year/:month/:day" component={DayRoute} />
          <Route path="/:year/:month" component={MonthRoute} />
          <Route path="/:year" component={YearRoute} />
          <Route path="/" component={ArchiveIndexRoute} />
        </Route>
        <Route path="/detail/:slug" component={DetailRoute} />
        <Route path="/" component={IndexRoute} />
      </Route>

      <Route path="/labs" component={LabsLayout}>
        <Route path="/archive" component={ArchiveLayout}>
          <Route path="/:year/:month/:day" component={DayRoute} />
          <Route path="/:year/:month" component={MonthRoute} />
          <Route path="/:year" component={YearRoute} />
          <Route path="/" component={ArchiveIndexRoute} />
        </Route>
        <Route path="/detail/:slug" component={DetailRoute} />
        <Route path="/" component={IndexRoute} />
      </Route>

      <Route path="/links" component={LinksLayout}>
        <Route path="/archive" component={ArchiveLayout}>
          <Route path="/:year/:month/:day" component={DayRoute} />
          <Route path="/:year/:month" component={MonthRoute} />
          <Route path="/:year" component={YearRoute} />
          <Route path="/" component={ArchiveIndexRoute} />
        </Route>
        <Route path="/detail/:slug" component={DetailRoute} />
        <Route path="/" component={IndexRoute} />
      </Route>

      <Route path="/events" component={EventsLayout}>
        <Route path="/archive" component={ArchiveLayout}>
          <Route path="/:year/:month/:day" component={DayRoute} />
          <Route path="/:year/:month" component={MonthRoute} />
          <Route path="/:year" component={YearRoute} />
          <Route path="/" component={ArchiveIndexRoute} />
        </Route>
        <Route path="/detail/:slug" component={DetailRoute} />
        <Route path="/" component={IndexRoute} />
      </Route>

      <Route path="/" component={HomeRoute} />
    </Router>
  )
}

export default App
