const $ = require('../../helpers')

const parseInstruction = line => {
  if (line.startsWith('cut'))
    return { type: 'CUT', value: +line.match(/(-?\d+)/)[1] }
  if (line === 'deal into new stack') return { type: 'NEW' }
  if (line.startsWith('deal with'))
    return { type: 'INC', value: +line.match(/(-?\d+)/)[1] }
  throw new Error('Unknown line ' + line)
}

const shuffle = (lines, size = 10007) =>
  lines.reduce((acc, line) => {
    const { type, value } = parseInstruction(line)
    if (type === 'NEW') return acc.reverse()
    if (type === 'CUT') return acc.slice(value).concat(acc.slice(0, value))
    if (type === 'INC') {
      const next = acc.slice(0)
      acc.forEach((item, i) => (next[(value * i) % acc.length] = item))
      return next
    }
  }, Array.from(Array(size).keys()))

module.exports = { shuffle }
