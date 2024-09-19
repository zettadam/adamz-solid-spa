import { createMemo } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import { type CollectionName } from '~/lib/api'

import PageNotFound from './PageNotFound'

const SearchRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

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

    return `${descriptions[section()]} ${props.params.query}`
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
