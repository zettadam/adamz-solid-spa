import { createMemo } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import { type CollectionName } from '~/lib/api'

import PageNotFound from './PageNotFound'

const IndexRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section()) return <PageNotFound />

  // TODO: See if we can make this better
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
