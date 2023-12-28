type Instruction = [number, number, string]
type State = Instruction[]
type States = Record<string, State>

// Parse the machine into something like this, where for each state, the first
// array is the instruction if the current value is 0, and the second one is
// if the current value is 1. An instruction is made of the new value, the
// pointer direction, and the next state.
// {
//  A: [ [1, +1, "B"], [0, -1, "C"] ],
//  B: [ [1, -1, "A"], [1, -1, "D"] ],
//  C: [ [1, +1, "D"], [0, +1, "C"] ],
//  D: [ [0, -1, "B"], [0, +1, "E"] ],
//  E: [ [1, +1, "C"], [1, -1, "F"] ],
//  F: [ [1, -1, "E"], [1, +1, "A"] ]
// }
const parse = (blocks: string[]) => {
  const [header, ...rest] = blocks.map(block => block.split('\n'))
  const initial = header[0].slice(-2, -1)
  const iterations = +header[1].match(/(\d+)/)![1]
  const states = rest.reduce<States>((acc, block) => {
    const name = block[0].slice(-2, -1)
    const if0 = block.slice(2, 5)
    const if1 = block.slice(6)

    acc[name] = [if0, if1].map(
      ([write, move, then]) =>
        [
          +write.match(/(\d+)/)![1],
          move.includes('left') ? -1 : +1,
          then.slice(-2, -1),
        ] as Instruction
    )

    return acc
  }, {})

  return { initial, iterations, states }
}

export const run = (input: string[]) => {
  const data = parse(input)
  const tape: Map<number, number> = new Map()
  let state = data.initial
  let pointer = 0

  for (let i = 0; i < data.iterations; i++) {
    const curr = tape.get(pointer) || 0
    const [to, dir, next] = data.states[state][curr]
    if (curr !== to) tape.set(pointer, to)
    pointer += dir
    state = next
  }

  return Array.from(tape.values()).filter(a => a === 1).length
}
