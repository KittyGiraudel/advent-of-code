import $ from '../../helpers'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const rotate = (string: string, id: number, set: string = ALPHABET) =>
  $.stringMap(string, char =>
    set.includes(char) ? set[(set.indexOf(char) + id) % set.length] : char
  )

const sortCounters = (
  [letterA, countA]: [string, number],
  [letterB, countB]: [string, number]
) => countB - countA || letterA.charCodeAt(0) - letterB.charCodeAt(0)

const parseRoom = (line: string) => {
  const [, hash, id, checksum] = $.safeMatch(
    line,
    /([a-z-]+)-(\d+)\[([^\]]+)\]$/
  )
  const letters = Array.from(hash.replace(/-/g, ''))
  const counters = Object.entries($.count(letters))
    .sort(sortCounters)
    .slice(0, 5)
  const valid = counters.map(([letter]) => letter).join('') === checksum

  return { name: rotate(hash, +id), id: +id, valid }
}

export const run = (input: string[]): [number, number | undefined] => {
  const rooms = input.map(parseRoom)

  return [
    $.sum(rooms.filter(room => room.valid).map(room => room.id)),
    rooms.find(r => r.name.includes('north'))?.id,
  ]
}
