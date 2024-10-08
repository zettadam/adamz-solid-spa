import { For, type Component, type JSX } from 'solid-js'
import { A } from '@solidjs/router'

import { formatDate, getMonthDays } from '~/lib/helpers/datetime'
import { type CollectionName } from '~/lib/api'

import { monthNamesLong } from '~/features/generic/constants'

const ArchiveMatrix: Component<{
  data?: any
  name: CollectionName
  year?: boolean
}> = (props): JSX.Element | null => {
  if (!props.data || !props.data()) return null

  const data = props.data() ?? []
  const name = props.name
  const year = props.year || false

  const items = groupFn(data)

  return (
    <menu class="matrix">
      <For each={Object.entries(items)}>
        {([y, months]) => (
          <li>
            <h3>{year ? y : <A href={`/${name}/archive/${y}`}>{y}</A>}</h3>
            <menu class="months">
              <For
                each={Object.entries(
                  months as {
                    [k: string]: {
                      total: number
                      days: { [k: string]: number }
                    }
                  },
                )}>
                {([m, info]) => (
                  <li>
                    <h4>
                      <A href={`/${name}/archive/${y}/${m}`}>
                        {monthNamesLong[m]}
                      </A>{' '}
                      ({info.total} links)
                    </h4>
                    <div class="hbox-swipe">
                      <menu class="days">
                        <For each={getMonthDays(y, m)}>
                          {(i) => (
                            <li>
                              {info.days[i] ? (
                                <>
                                  <A href={`/${name}/archive/${y}/${m}/${i}`}>
                                    {i}
                                  </A>
                                  <span
                                    class="bar"
                                    style={{
                                      height: `${info.days[i] / 2}rem`,
                                    }}
                                  />
                                  <b>{info.days[i]}</b>
                                </>
                              ) : (
                                i
                              )}
                            </li>
                          )}
                        </For>
                      </menu>
                    </div>
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

export default ArchiveMatrix

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
