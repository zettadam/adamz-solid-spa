import {
  createMemo,
  createResource,
  onCleanup,
  type Component,
  type JSX,
} from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { A, useLocation, useParams } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import Error from '~/components/Error'
import Loading from '~/components/Loading'
import ListBasic from '~/components/ListBasic'
import { monthNamesLong } from '../constants'
import { getTimezoneOffset } from '~/lib/helpers/datetime'
import ArchiveAside from '~/components/ArchiveAside'
import PageNotFound from '../PageNotFound'

const MonthRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const { month, year } = useParams()

  const section = createMemo(() => location.pathname.split('/')[1] ?? '')

  if (!section() || !year || !month) return <PageNotFound />

  const tzOffset = getTimezoneOffset()
  const ref = new Date(`${year}-${month}-15`)
  const lastDay = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate()

  const startTime = `${year}-${month}-01 00:00:00.000 ${tzOffset}`
  const endTime = `${year}-${month}-${lastDay} 23:59:59.999 ${tzOffset}`

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
        Archived {section()} in {monthNamesLong[month]}, {year}— Adam Ziolkowski
      </Title>
      <Meta
        name="description"
        content={`Monthly archive of ${section()} for ${monthNamesLong[month]}, ${year}`}
      />
      <div class="page archive">
        <h2>Month Archive</h2>
        <nav>
          <ul>
            <li>
              <A href={`/${section()}/archive`}>⁜</A>
            </li>
            <li>
              <A href={`/${section()}/archive/${year}`}>{year}</A>
            </li>
            <li>{monthNamesLong[month]}</li>
          </ul>
        </nav>

        <main>
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
