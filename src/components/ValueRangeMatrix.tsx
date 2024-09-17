import { For, type Component, type JSX } from 'solid-js'
import { A } from '@solidjs/router'

import { type CollectionName } from '~/lib/api'

const ValueRangeMatrix: Component<{
  data?: any
  name: CollectionName
}> = (props): JSX.Element | null => {
  if (!props.data || !props.data()) return null

  const name = props.name
  const data = props.data() ?? []

  const items = Object.entries(groupFn(data)).sort((a, b) =>
    a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0,
  )
  const maxCount = Math.max(...items.map(([_, v]) => v))

  return (
    <menu class="value-index">
      <li>
        <b>Range</b>
        <b>Count</b>
      </li>
      <For each={items}>
        {([r, count]) => (
          <li>
            <A href={`/${name}/value/${r}`}>{r}</A>
            <span>{count}</span>
            <span class="bar" style={`width: ${(count / maxCount) * 100}%`} />
          </li>
        )}
      </For>
    </menu>
  )
}

export default ValueRangeMatrix

/**
 * Reduce a given array into a new array grouped by value ranges.
 *
 * @param data {array} An array of objects with values (significance).
 * @returns {object} An object with value ranges and related counts.
 */
function groupFn(data: []): Record<string, number> {
  const ranges = {
    '0': 0,
    '1-10': 0,
    '11-20': 0,
    '21-30': 0,
    '31-40': 0,
    '41-50': 0,
    '51-60': 0,
    '61-70': 0,
    '71-80': 0,
    '81-90': 0,
    '91-100': 0,
    '100+': 0,
  }

  return data.reduce((acc: any, i: { significance: number }): typeof ranges => {
    const s = i.significance
    // prettier-ignore
    switch(true) {
        case s <= 0:   acc['0']++;      break;
        case s <= 10:  acc['1-10']++;   break;
        case s <= 20:  acc['11-20']++;  break;
        case s <= 30:  acc['21-30']++;  break;
        case s <= 40:  acc['31-40']++;  break;
        case s <= 50:  acc['41-50']++;  break;
        case s <= 60:  acc['51-60']++;  break;
        case s <= 70:  acc['61-70']++;  break;
        case s <= 80:  acc['71-80']++;  break;
        case s <= 90:  acc['81-90']++;  break;
        case s <= 100: acc['91-100']++; break;
        case s > 100:  acc['100+']++;   break;
        default:       acc['0']++
      }
    return acc
  }, ranges)
}
