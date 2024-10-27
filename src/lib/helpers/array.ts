import { formatDate, subtractDays, subtractMonths } from './datetime'

export interface Item {
  [key: string]: any
}

type GroupedItems = {
  [key: string | number]: Item[]
}

type Format = 'short' | 'medium' | 'long'

export function groupByDatetime(
  items: Item[],
  key: string = 'published',
  format: Format = 'medium',
): GroupedItems {
  const output = items.reduce(
    (acc: { [k: string]: Item[] }, item: Item): GroupedItems => {
      const date: string | null = formatDate(item[key], format)
      if (date && !(date in acc)) acc[date] = []
      if (date) acc[date].push(item)
      return acc
    },
    {},
  )

  return output
}

export function groupByTimePeriod(
  items: Item[],
  key: string,
): Map<string | number, Item[]> {
  const n = new Date()
  const w = subtractDays(n, 7)
  const m = subtractMonths(n, 1)
  const q = subtractMonths(n, 3)
  const y = subtractMonths(n, 12)

  const o = new Map()

  items.forEach((i: Item) => {
    const p = new Date(i[key])

    if (!o.has('week')) o.set('week', [])
    if (!o.has('month')) o.set('month', [])
    if (!o.has('quarter')) o.set('quarter', [])
    if (!o.has('year')) o.set('year', [])

    if (p >= w) o.get('week').push(i)
    else if (p >= m) o.get('month').push(i)
    else if (p >= q) o.get('quarter').push(i)
    else if (p >= y) o.get('year').push(i)
    else {
      const Y = p.getFullYear()
      if (!o.has(Y)) o.set(Y, [])
      o.get(Y).push(i)
    }
  })

  return o
}
