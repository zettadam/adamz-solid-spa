import { createMemo, createResource, onCleanup } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { A, type RouteSectionProps } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import { getTimezoneOffset } from '~/lib/helpers/datetime'
import Loading from '~/components/Loading'
import ListBasic from '~/components/ListBasic'
import ArchiveAside from '~/components/ArchiveAside'

import { monthNamesLong } from '../constants'
import PageNotFound from '../PageNotFound'

const DayRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')
  const year = props.params.year
  const month = props.params.month
  const day = props.params.day

  if (!section() || !year || !month || !day) return <PageNotFound />

  const tzOffset = getTimezoneOffset()
  const startTime = `${year}-${month}-${day} 00:00:00.000 ${tzOffset}`
  const endTime = `${year}-${month}-${day} 23:59:59.999 ${tzOffset}`

  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())

    const data = await getAllRecords({
      name: section() as CollectionName,
      options: {
        fields:
          'links' === section()
            ? `url,title,abstract,published,tags`
            : `id,title,slug,abstract,published,tags`,
        filter: `published != null && published >= "${startTime}" && published <= "${endTime}"`,
        perPage: 1000000,
        sort: `-published`,
      },
    })
    return data
  })

  return (
    <>
      <Title>
        Archived {section()} on {monthNamesLong[month]} {day}, {year}—Adam
        Ziolkowski
      </Title>
      <Meta
        name="description"
        content={`Daily archive of ${section()} for ${monthNamesLong[month]} ${day}, ${year}`}
      />
      <div class="page archive">
        <h2>Day Archive</h2>
        <nav>
          <ul>
            <li>
              <A href={`/${section()}/archive`}>⁜</A>
            </li>
            <li>
              <A href={`/${section()}/archive/${year}`}>{year}</A>
            </li>
            <li>
              <A href={`/${section()}/archive/${year}/${month}`}>
                {monthNamesLong[month]}
              </A>
            </li>
            <li>{day}</li>
          </ul>
        </nav>

        <main id="content">
          {data.loading ? (
            <Loading name={section()} />
          ) : data.error ? (
            <Error message={data.error} name={section()} />
          ) : (
            <ListBasic data={data} name={section()} />
          )}
        </main>

        <aside>
          <ArchiveAside name={section() as CollectionName} />
        </aside>
      </div>
    </>
  )
}

export default DayRoute
