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

const queryFn = async ({
  name,
  year,
  month,
  day,
}: {
  name: CollectionName
  year: string
  month: string
  day: string
}) => {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const tzOffset = getTimezoneOffset()
  const startTime = `${year}-${month}-${day} 00:00:00.000 ${tzOffset}`
  const endTime = `${year}-${month}-${day} 23:59:59.999 ${tzOffset}`

  const data = await getAllRecords({
    name,
    options: {
      fields:
        'links' === name
          ? `url,title,abstract,published,tags`
          : `id,title,slug,abstract,published,tags`,
      filter: `published != null && published >= "${startTime}" && published <= "${endTime}"`,
      perPage: 1000000,
      sort: `-published`,
    },
  })

  return data
}

const DayRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')
  const p = props.params

  if (!section() || !p.year || !p.month || !p.day) return <PageNotFound />

  const [data] = createResource(
    () => ({
      name: section() as CollectionName,
      year: p.year,
      month: p.month,
      day: p.day,
    }),
    queryFn,
  )

  return (
    <>
      <Title>
        Archived {section()} on {monthNamesLong[p.month]} {p.day}, {p.year}—Adam
        Ziolkowski
      </Title>
      <Meta
        name="description"
        content={`Daily archive of ${section()} for ${monthNamesLong[p.month]} ${p.day}, ${p.year}`}
      />
      <div class="page archive">
        <h2>Day Archive</h2>
        <nav>
          <ul>
            <li>
              <A href={`/${section()}/archive`}>⁜</A>
            </li>
            <li>
              <A href={`/${section()}/archive/${p.year}`}>{p.year}</A>
            </li>
            <li>
              <A href={`/${section()}/archive/${p.year}/${p.month}`}>
                {monthNamesLong[p.month]}
              </A>
            </li>
            <li>{p.day}</li>
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
