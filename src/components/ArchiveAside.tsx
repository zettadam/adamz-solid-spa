import {
  createResource,
  For,
  onCleanup,
  type Component,
  type JSX,
} from 'solid-js'
import { A, useParams } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import { formatDate, getTimezoneOffset } from '~/lib/helpers/datetime'
import { monthNamesLong } from '~/features/generic/constants'

import Error from '~/components/Error'
import Loading from '~/components/Loading'

const ArchiveAside: Component<{
  name: CollectionName
}> = (props): JSX.Element => {
  const { day, month, year } = useParams()
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

  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())

    const data = await getAllRecords({
      name: props.name,
      options: {
        fields: `published`,
        filter: `published != null${year ? `&& published >= "${startTime}" && published <= "${endTime}"` : ''}`,
        perPage: 1000000,
        sort: `-published`,
      },
    })
    return data
  })

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

function ArchiveList(props: { data?: any; name: string }): JSX.Element | null {
  if (!props.data || !props.data()) return null

  const name = props.name
  const data = props.data() ?? []
  if (data.length < 1) return null

  const { day, month, year } = useParams()

  const items = groupFn(data)

  return (
    <menu>
      <For each={Object.entries(items)}>
        {([y, months]) => (
          <li>
            {!year && <A href={`/${name}/archive/${y}`}>{y}</A>}
            <menu>
              <For
                each={Object.entries(
                  months as { [k: string]: { total: number; days: {} } },
                )}>
                {([m, info]) => (
                  <li>
                    {(!year && !month) || (year === y && month !== m) ? (
                      <span>
                        <A href={`/${name}/archive/${y}/${m}`}>
                          {monthNamesLong[m]}
                        </A>
                        <span>({info.total})</span>
                      </span>
                    ) : (
                      <span>
                        <b>{monthNamesLong[m]}</b>
                        <span>({info.total})</span>
                      </span>
                    )}
                    <menu>
                      <For
                        each={Object.entries(
                          info.days as { [k: string]: number },
                        )
                          .sort()
                          .reverse()}>
                        {([d, c]) => (
                          <li>
                            {!day ||
                            (year === y && month === m && day !== d) ? (
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
                  </li>
                )}
              </For>
            </menu>
          </li>
        )}
      </For>
    </menu>
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
