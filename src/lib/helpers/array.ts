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

type DayCount = Record<string, number>
type MonthCount = Record<string, { total: number; days: DayCount }>
type YearCount = Record<string, { total: number; months: MonthCount }>
type FullCount = { total: number; years: YearCount }

export function countByYearMonthDay(
  items: Item[],
  key: string = 'published',
  format: Format = 'medium',
): FullCount {
  return items.reduce(
    (acc: any, item: Item): any => {
      const f = formatDate(item[key], format)
      if (f) {
        const d = f?.split('/')
        const year = parseInt(d[2].trim(), 10)
        const day = parseInt(d[1].trim(), 10)
        const month = parseInt(d[0].trim(), 10)

        if (!acc.years[year]) acc.years[year] = { total: 0, months: {} }
        if (!acc.years[year].months[month])
          acc.years[year].months[month] = { total: 0, days: {} }
        if (!acc.years[year].months[month].days[day])
          acc.years[year].months[month].days[day] = 0

        acc.total++
        acc.years[year].total++
        acc.years[year].months[month].total++
        acc.years[year].months[month].days[day]++
      }
      return acc
    },
    { total: 0, years: {} },
  )
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
