import { RecordModel } from 'pocketbase'
import { formatDate } from './datetime'

export interface Item extends RecordModel {
  published: string
}

type GroupedItems = {
  [key: string]: Item[]
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
