import $ from '../../helpers'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

type Room = {
  name: string
  id: number
  valid: boolean
}

const rotate = (string: string, id: number, set: string = ALPHABET) =>
  $.stringMap(string, char =>
    set.includes(char) ? set[(set.indexOf(char) + id) % set.length] : char
  )

const sortCounters = (
  [letterA, countA]: [string, number],
  [letterB, countB]: [string, number]
) => countB - countA || letterA.charCodeAt(0) - letterB.charCodeAt(0)

const parseRoom = (line: string) => {
  const [, hash, id, checksum] = $.match(line, /([a-z-]+)-(\d+)\[([^\]]+)\]$/)
  const letters = Array.from(hash.replace(/-/g, ''))
  const counters = Object.entries($.frequency(letters))
    .sort(sortCounters)
    .slice(0, 5)
  const valid = counters.map(([letter]) => letter).join('') === checksum

  return { name: rotate(hash, +id), id: +id, valid } as Room
}

export const run = (input: string[], advanced: boolean = false) => {
  const rooms = input.map(parseRoom)

  return advanced
    ? rooms.find(room => room.name.includes('north'))?.id
    : $.sum(rooms.filter(room => room.valid).map(room => room.id))
}
