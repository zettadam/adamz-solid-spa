import { formatDate, subtractDays, subtractMonths } from './datetime'

export interface Item {
  [key: string]: any
}

type GroupedItems = {
  [key: string | number]: Item[]
}

type Format = 'short' | 'medium' | 'long'

export function groupByPublishedDatetime(
  items: Item[],
  format: Format = 'medium',
): GroupedItems {
  const output = items.reduce(
    (acc: { [key: string]: Item[] }, item: Item): GroupedItems => {
      const date: string | null = formatDate(item.published, format)
      if (date && !(date in acc)) acc[date] = []
      if (date) acc[date].push(item)
      return acc
    },
    {},
  )

  return output
}

export function groupByPublishedPeriod(
  items: Item[],
): Map<string | number, Item[]> {
  const n = new Date()
  const w = subtractDays(n, 7)
  const m = subtractMonths(n, 1)
  const q = subtractMonths(n, 3)
  const y = subtractMonths(n, 12)

  const o = new Map()

  items.forEach((i: Item) => {
    const p = new Date(i.published)

    if (!o.has('week')) o.set('week', [])
    if (!o.has('month')) o.set('month', [])
    if (!o.has('quarter')) o.set('quarter', [])
    if (!o.has('year')) o.set('year', [])

    if (p > w) {
      o.get('week').push(i)
      return
    }
    if (p > m) {
      o.get('month').push(i)
      return
    }

    if (p > q) {
      o.get('quarter').push(i)
      return
    }

    if (p > y) {
      o.get('year').push(i)
      return
    }

    const Y = p.getFullYear()
    if (!o.has(Y)) o.set(Y, [])
    o.get(Y).push(i)
  })

  return o
}
