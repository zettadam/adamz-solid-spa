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

  return (
    <menu class="matrix">
      <For each={Object.entries(items)}>
        {([y, months]) => (
          <li>
            <h3>{year ? y : <A href={`/${name}/archive/${y}`}>{y}</A>}</h3>
            <menu class="months">
              <For each={Object.entries(months).reverse()}>
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
