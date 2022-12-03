const $ = require('../../helpers')

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const rotate = (string, id, set = ALPHABET) =>
  $.stringMap(string, char =>
    set.includes(char) ? set[(set.indexOf(char) + id) % set.length] : char
  )

const sortCounters = ([letterA, countA], [letterB, countB]) =>
  countB - countA || letterA.charCodeAt() - letterB.charCodeAt()

const parseRoom = line => {
  const [, hash, id, checksum] = line.match(/([a-z-]+)-(\d+)\[([^\]]+)\]$/)
  const letters = Array.from(hash.replace(/-/g, ''))
  const counters = Object.entries($.count(letters))
    .sort(sortCounters)
    .slice(0, 5)
  const valid = counters.map(([letter]) => letter).join('') === checksum

  return { name: rotate(hash, +id), id: +id, valid }
}

const run = input => {
  const rooms = input.map(parseRoom)

  return [
    $.sum(rooms.filter(room => room.valid).map(room => room.id)),
    rooms.find(r => r.name.includes('north'))?.id,
  ]
}

module.exports = { run }
