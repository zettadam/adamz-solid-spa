const fullDateTimeFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeStyle: 'full',
  timeZone: 'America/Chicago',
})

const longDateTimeFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'long',
  timeZone: 'America/Chicago',
})

const shortDateTimeFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Chicago',
})

export function formatDate(
  input: string,
  type: 'full' | 'long' | 'short' = 'long',
) {
  if (!input) return

  const date = new Date(input)

  if (date instanceof Date) {
    const output =
      type === 'full'
        ? fullDateTimeFormat.format(date)
        : type === 'long'
          ? longDateTimeFormat.format(date)
          : shortDateTimeFormat.format(date)

    console.log('formatDate', input, output)

    return output
  } else {
    console.error('Invalid date', date)
    return
  }
}
