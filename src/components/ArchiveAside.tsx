import { createResource, For, onCleanup } from 'solid-js'
import { A, useParams } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import { formatDate, getTimezoneOffset } from '~/lib/helpers/datetime'
import { monthNamesLong } from '~/features/generic/constants'

import Error from '~/components/Error'
import Loading from '~/components/Loading'

const queryFn = async ({
  name,
  year,
  month,
  day,
}: {
  name: CollectionName
  year: string
  month: string
  day?: string
}) => {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  let startDate, endDate, startTime, endTime

  const tzOffset = getTimezoneOffset()
  if (day) {
    const ref = new Date(`${year}-${month}-15`)
    const lastDay = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate()
    startDate = `${year}-${month}-01`
    endDate = `${year}-${month}-${lastDay}`
  } else {
    startDate = `${year}-01-01`
    endDate = `${year}-12-31`
  }
  startTime = `${startDate} 00:00:00.000 ${tzOffset}`
  endTime = `${endDate} 23:59:59.999 ${tzOffset}`

  const data = await getAllRecords({
    name: name,
    options: {
      fields: `published`,
      filter: `published != null${year ? `&& published >= "${startTime}" && published <= "${endTime}"` : ''}`,
      perPage: 1000000,
      sort: `-published`,
    },
  })
  return data
}

const ArchiveAside = (props: { name: CollectionName }) => {
  const p = useParams()

  const [data] = createResource(
    () => ({
      name: props.name,
      year: p.year,
      month: p.month,
      day: p.day,
    }),
    queryFn,
  )

  return (
    <>
      {data.loading && <Loading archive name={props.name} />}
      {data.error && <Error message={data.error} name={props.name} />}
      {!data.loading && !data.error && (
        <>
          <h4>Archive</h4>
          <ArchiveList data={data} name={props.name} />
        </>
      )}
    </>
  )
}

export default ArchiveAside

function ArchiveList(props: { data?: any; name: string }) {
  if (!props.data || !props.data()) return null

  const name = props.name
  const data = props.data() ?? []
  if (data.length < 1) return null

  const p = useParams()

  const items = groupFn(data)

  return (
    <>
      <For each={Object.entries(items)}>
        {([y, months]) => (
          <>
            <h5>{!p.year && y}</h5>
            <For
              each={Object.entries(
                months as { [k: string]: { total: number; days: {} } },
              )}>
              {([m, info], i) => (
                <details open={i() < 1}>
                  <summary>
                    {monthNamesLong[m]} ({info.total})
                  </summary>
                  <menu>
                    <For
                      each={Object.entries(info.days as { [k: string]: number })
                        .sort()
                        .reverse()}>
                      {([d, c]) => (
                        <li>
                          {!p.day ||
                          (p.year === y && p.month === m && p.day !== d) ? (
                            <span>
                              <A href={`/${name}/archive/${y}/${m}/${d}`}>
                                {monthNamesLong[m]} {d}
                              </A>
                              <span>({c})</span>
                            </span>
                          ) : (
                            <span>
                              <b>
                                {monthNamesLong[m]} {d}
                              </b>
                              <span>({c})</span>
                            </span>
                          )}
                        </li>
                      )}
                    </For>
                  </menu>
                </details>
              )}
            </For>
          </>
        )}
      </For>
    </>
  )
}

type DayCount = Record<string, number>
type MonthCount = Record<string, { total: number; days: DayCount }>
type YearCount = Record<string, MonthCount>

function groupFn(data: []): YearCount {
  return data.reduce((acc: any, i: { published: string }): any => {
    const f = formatDate(i.published, 'short')
    if (f) {
      const d = f?.split('/')
      const year = d[2].trim()
      const day = d[1].trim()
      const month = d[0].trim()
      if (!acc[year]) {
        acc[year] = {}
      }
      if (!acc[year][month]) {
        acc[year][month] = { total: 0, days: {} }
      }
      if (!acc[year][month].days[day]) {
        acc[year][month].days[day] = 0
      }
      acc[year][month].total++
      acc[year][month].days[day]++
    }
    return acc
  }, {})
}
