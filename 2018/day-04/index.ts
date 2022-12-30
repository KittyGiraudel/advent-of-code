import $ from '../../helpers'

type Event = {
  start?: number
  end?: number
  minutes?: number[]
  date: Date
  id: number
  type: string
}

// Given a line like the following, break it on the closing bracket. Anything
// before (but the first char which is an open bracket) is the raw date, and
// anything after is the rest of the event.
// e.g. [1518-09-08 00:45] wakes up
const parseLog = (line: string): Event => {
  const [rawDate, rest] = line.split(']')
  const date = new Date(rawDate.slice(1) + 'Z')
  const id = +rest.match(/\d+/)?.[0]
  const type = rest.split(' ').slice(-2).join(' ')

  return { date, id, type }
}

// If the event does not have an ID (which is the case for all events but the
// shift starts), read it from the previous entry in the event log. This way,
// a “falls asleep” event will read it from the previous “begins shift” event,
// and a “wakes up” event will read it from the previous “falls asleep” event.
const recordGuardId = (event: Event, index: number, log: Event[]): Event => {
  if (!event.id) {
    event.id = log[index - 1].id
  }

  return event
}

// Process the event to aggregate the relevant data. If the event is “falls
// asleep”, port the current minute to the next event (which is *necessarily*
// “wakes up”), so the sleep duration can be computed. If the event is “wakes
// up”, record the current minute as the end of the sleep cycle, and record all
// the minutes that the guard spent asleep.
const processEvent = (event: Event, index: number, log: Event[]): Event => {
  if (event.type === 'falls asleep') {
    ;(log[index + 1] as Event).start = event.date.getUTCMinutes()
  }

  if (event.type === 'wakes up') {
    event.end = event.date.getUTCMinutes()
    event.minutes = $.range(event.end - event.start, event.start)
  }

  return event
}

// Aggregate individual events into two data structures:
// - A dictionary of guards mapping their ID to the amount of time they slept.
// - An array of minutes that were collectively spent asleep.
const aggregateEvents = (
  acc: { [key: string]: number[] },
  event: Event
): { [key: string]: number[] } => {
  if (!(event.id in acc)) {
    acc[event.id] = []
  }

  if (event.type === 'wakes up') {
    acc[event.id].push(...event.minutes)
  }

  return acc
}

const formatData = ([guardId, minutes]: [string, number[]]): {
  id: number
  duration: number
  counters: { minute: number; occurrences: number }[]
} => ({
  id: +guardId,
  duration: minutes.length,
  counters: Object.entries($.count(minutes))
    .map(([minute, occurrences]) => ({ minute: +minute, occurrences }))
    .sort((a, b) => b.occurrences - a.occurrences),
})

export const find = (input: string[]): [number, number] => {
  const data = Object.entries(
    input
      .map(parseLog)
      .sort((a, b) => +a.date - +b.date)
      .map(recordGuardId)
      .filter(event => event.type !== 'begins shift')
      .map(processEvent)
      .reduce(aggregateEvents, {})
  ).map(formatData)

  const sleepiestGuard = data
    .slice(0)
    .sort((a, b) => a.duration - b.duration)
    .pop()
  const sleepiestMinute = data
    .slice(0)
    .sort((a, b) => a.counters[0].occurrences - b.counters[0].occurrences)
    .pop()

  return [
    sleepiestGuard.id * sleepiestGuard.counters[0].minute,
    sleepiestMinute.id * sleepiestMinute.counters[0].minute,
  ]
}
