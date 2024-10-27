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
    (acc: { [k: string]: Item[] }, item): GroupedItems => {
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
  const o = new Map()
  o.set('week', [])
  o.set('month', [])
  o.set('quarter', [])
  o.set('year', [])

  const t = new Date()
  const w = subtractDays(t, 7)
  const m = subtractMonths(t, 1)
  const q = subtractMonths(t, 3)
  const y = subtractMonths(t, 12)

  items.forEach((i) => {
    const p = new Date(i[key])

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
