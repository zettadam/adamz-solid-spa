import { createMemo, type Accessor, type JSX, type Component } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { useLocation } from '@solidjs/router'

import { CollectionName } from '~/lib/api'
import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import PageNotFound from './PageNotFound'

const IndexRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const section: Accessor<string> = createMemo(
    () => location.pathname.split('/')[1] ?? '',
  )

  if (!section()) return <PageNotFound />

  const getMetaDescription = () => {
    const descriptions: Record<string, string> = {
      posts: 'Latest posts written by Adam Ziolkowski',
      notes: 'Latest notes written by Adam Ziolkowski',
      links: 'Latest links curated by Adam Ziolkowski',
      code: 'Latest code snippets written or found by Adam Ziolkowski',
      labs: 'Latest experiments in web development created by Adam Ziolkowski',
      events: 'Latest events',
    }

    return descriptions[section()]
  }

  return (
    <>
      <Title>Latest {section()}—Adam Ziolkowski</Title>
      <Meta name="description" content={getMetaDescription()} />
      <div class="page index">
        <h2>Latest</h2>
        <main id="content">
          {section() && <PaginatedListBasic name={section()} />}
        </main>
        <aside>
          <ArchiveAside name={section() as CollectionName} />
        </aside>
      </div>
    </>
  )
}

export default IndexRoute
