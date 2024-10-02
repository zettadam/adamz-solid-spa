import { createMemo, createResource, onCleanup } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { A, RouteSectionProps } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import { getTimezoneOffset } from '~/lib/helpers/datetime'
import Error from '~/components/Error'
import Loading from '~/components/Loading'
import ListBasic from '~/components/ListBasic'
import ArchiveAside from '~/components/ArchiveAside'

import { monthNamesLong } from '../constants'
import PageNotFound from '../PageNotFound'

const queryFn = async ({
  name,
  year,
  month,
}: {
  name: CollectionName
  year: string
  month: string
}) => {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const tzOffset = getTimezoneOffset()
  const ref = new Date(`${year}-${month}-15`)
  const lastDay = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate()

  const startTime = `${year}-${month}-01 00:00:00.000 ${tzOffset}`
  const endTime = `${year}-${month}-${lastDay} 23:59:59.999 ${tzOffset}`

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

const MonthRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')
  const p = props.params

  if (!section() || !p.year || !p.month) return <PageNotFound />

  const [data] = createResource(
    () => ({
      name: section() as CollectionName,
      year: p.year,
      month: p.month,
    }),
    queryFn,
  )

  return (
    <>
      <Title>
        Archived {section()} in {monthNamesLong[p.month]}, {p.year}— Adam
        Ziolkowski
      </Title>
      <Meta
        name="description"
        content={`Monthly archive of ${section()} for ${monthNamesLong[p.month]}, ${p.year}`}
      />
      <div class="page archive">
        <h2>Month Archive</h2>
        <nav>
          <ul>
            <li>
              <A href={`/${section()}/archive`}>⁜</A>
            </li>
            <li>
              <A href={`/${section()}/archive/${p.year}`}>{p.year}</A>
            </li>
            <li>{monthNamesLong[p.month]}</li>
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

export default MonthRoute
