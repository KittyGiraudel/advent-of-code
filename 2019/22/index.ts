import $ from '../../helpers'

const parseInstruction = (line: string) => {
  if (line.startsWith('cut'))
    return { type: 'CUT', value: +line.match(/(-?\d+)/)![1] }
  if (line === 'deal into new stack') return { type: 'NEW' }
  if (line.startsWith('deal with'))
    return { type: 'INC', value: +line.match(/(-?\d+)/)![1] }
  throw new Error('Unknown line ' + line)
}

export const shuffle = (lines: string[], size: number = 10_007) =>
  lines.reduce((acc, line) => {
    const { type, value } = parseInstruction(line)
    if (type === 'NEW') return acc.reverse()
    if (type === 'CUT') return acc.slice(value).concat(acc.slice(0, value))
    if (type === 'INC') {
      const next = acc.slice(0)
      acc.forEach((item, i) => (next[(value! * i) % acc.length] = item))
      return next
    }
    return acc
  }, Array.from(Array(size).keys()))
