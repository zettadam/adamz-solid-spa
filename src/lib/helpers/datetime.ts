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

const mediumDateTimeFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'medium',
  timeZone: 'America/Chicago',
})

const shortDateTimeFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Chicago',
})

export function formatDatetime(
  input: string,
  type: 'full' | 'long' | 'medium' | 'short' = 'short',
) {
  if (!input) return null

  let f

  const date = new Date(input)

  if (date instanceof Date) {
    switch (type) {
      case 'full':
        f = fullDateTimeFormat
        break
      case 'long':
        f = longDateTimeFormat
        break
      case 'medium':
        f = mediumDateTimeFormat
        break
      default:
        f = shortDateTimeFormat
    }
    return f.format(date)
  } else {
    return null
  }
}

const fullDateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
  timeZone: 'America/Chicago',
})

const longDateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'America/Chicago',
})

const mediumDateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'America/Chicago',
})

const shortDateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeZone: 'America/Chicago',
})

export function formatDate(
  input: string,
  type: 'full' | 'long' | 'medium' | 'short' = 'short',
) {
  if (!input) return null

  let f

  const date = new Date(input)

  if (date instanceof Date) {
    switch (type) {
      case 'full':
        f = fullDateFormat
        break
      case 'long':
        f = longDateFormat
        break
      case 'medium':
        f = mediumDateFormat
        break
      default:
        f = shortDateFormat
    }
    return f.format(date)
  } else {
    return null
  }
}