import { For, type Component, type JSX } from 'solid-js'
import { A } from '@solidjs/router'

import { getMonthDays } from '~/lib/helpers/datetime'
import { countByYearMonthDay } from '~/lib/helpers/array'
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

  const items = countByYearMonthDay(data, 'published', 'short')

  console.log('items', items)

  return (
    <menu class="matrix">
      <For each={Object.entries(items.years)}>
        {([y, yearInfo]) => (
          <li>
            <h3>
              {year ? y : <A href={`/${name}/archive/${y}`}>{y}</A>}{' '}
              <i>({yearInfo.total} links)</i>
            </h3>
            <menu class="months">
              <For each={Object.entries(yearInfo.months).reverse()}>
                {([m, monthInfo]) => (
                  <li>
                    <h4>
                      <A href={`/${name}/archive/${y}/${m}`}>
                        {monthNamesLong[m]}
                      </A>{' '}
                      <i>({monthInfo.total} links)</i>
                    </h4>
                    <div class="hbox-swipe">
                      <menu class="days">
                        <For each={getMonthDays(y, m)}>
                          {(i) => (
                            <li>
                              {monthInfo.days[i] ? (
                                <>
                                  <A href={`/${name}/archive/${y}/${m}/${i}`}>
                                    {i}
                                  </A>
                                  <span
                                    class="bar"
                                    style={{
                                      height: `${monthInfo.days[i] / 2}rem`,
                                    }}
                                  />
                                  <b>{monthInfo.days[i]}</b>
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
