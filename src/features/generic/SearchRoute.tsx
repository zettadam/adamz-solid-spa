import { createMemo, type Accessor, type JSX, type Component } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { useLocation, useParams } from '@solidjs/router'

import { CollectionName } from '~/lib/api'
import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import PageNotFound from './PageNotFound'

const SearchRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const params = useParams()
  const section: Accessor<string> = createMemo(
    () => location.pathname.split('/')[1] ?? '',
  )

  if (!section()) return <PageNotFound />

  const getMetaDescription = () => {
    const descriptions: Record<string, string> = {
      posts: 'Posts found that match query',
      notes: 'Notes found that match query',
      links: 'Links found that metch query',
      code: 'Code snippets found that match query',
      labs: 'Experiments found that match query',
      events: 'Events found that match query',
    }

    return `${descriptions[section()]} ${params.query}`
  }

  return (
    <>
      <Title>Found {section()}—Adam Ziolkowski</Title>
      <Meta name="description" content={getMetaDescription()} />
      <div class="page index">
        <h2>Search results</h2>
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

export default SearchRoute
