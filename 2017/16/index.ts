import $ from '../../helpers'

type Spin = { type: 'SPIN'; value: number }
type Exchange = { type: 'EXCHANGE'; value: number[] }
type Partner = { type: 'PARTNER'; value: string[] }
type Instruction = Spin | Exchange | Partner

export const dance = (
  input: string[],
  size = 16,
  iterations = 1
) => {
  const programs = $.range(size, 97).map(a => String.fromCharCode(a))
  const history: string[] = []

  const instructions = input.map(line => {
    if (line.startsWith('s'))
      return { type: 'SPIN', value: +line.slice(1) } as Spin
    if (line.startsWith('x'))
      return {
        type: 'EXCHANGE',
        value: line.slice(1).split('/').map(Number),
      } as Exchange
    if (line.startsWith('p')) {
      return { type: 'PARTNER', value: line.slice(1).split('/') } as Partner
    }
    throw new Error('Could not parse instruction')
  })

  for (let i = 0; i < iterations; i++) {
    instructions.forEach(({ type, value }) => {
      if (type === 'SPIN') {
        let x = value
        while (x--) programs.unshift(programs.pop()!)
      }
      if (type === 'EXCHANGE') {
        ;[programs[value[0]], programs[value[1]]] = [
          programs[value[1]],
          programs[value[0]],
        ]
      }
      if (type === 'PARTNER') {
        const a = programs.findIndex(p => p === value[0])
        const b = programs.findIndex(p => p === value[1])
        ;[programs[a], programs[b]] = [programs[b], programs[a]]
      }
    })

    const key = programs.join('')
    const index = history.indexOf(key)

    // This is the exact same logic as AoC 2018 Day 18. The program rapidly
    // enters a loop, which can be broken early by computing the remaining
    // operations.
    if (index >= 0) return history[(iterations - index - 1) % history.length]
    else history.push(key)
  }

  return programs.join('')
}
