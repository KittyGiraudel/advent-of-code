import $ from '../../helpers'

type Sample = {
  operation: Array<number>
  before: Array<number>
  after: Array<number>
}

const OPCODES = {
  addr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] + regs[B]),
  addi: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] + B),
  mulr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] * regs[B]),
  muli: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] * B),
  banr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] & regs[B]),
  bani: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] & B),
  borr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] | regs[B]),
  bori: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A] | B),
  setr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, regs[A]),
  seti: (regs, [A, B, C]) => $.updateAtIndex(regs, C, A),
  gtir: (regs, [A, B, C]) => $.updateAtIndex(regs, C, +(A > regs[B])),
  gtri: (regs, [A, B, C]) => $.updateAtIndex(regs, C, +(regs[A] > B)),
  gtrr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, +(regs[A] > regs[B])),
  eqir: (regs, [A, B, C]) => $.updateAtIndex(regs, C, +(A === regs[B])),
  eqri: (regs, [A, B, C]) => $.updateAtIndex(regs, C, +(regs[A] === B)),
  eqrr: (regs, [A, B, C]) => $.updateAtIndex(regs, C, +(regs[A] === regs[B])),
}

const parseSample = ([before, op, after]: Array<string>): Sample => ({
  operation: op.split(' ').map(Number),
  before: JSON.parse(before.replace('Before: ', '')),
  after: JSON.parse(after.replace('After: ', '')),
})

export const debug = (input: Array<string>) => {
  const capacity = Object.keys(OPCODES).length
  const program = input
    .at(-1)
    .split('\n')
    .map(line => line.split(' ').map(Number))
  const registry: (string | Set<string>)[] = input
    .slice(0, -2)
    .map(line => line.split('\n'))
    .map(parseSample)
    .reduce(
      (registry, { before, after, operation }: Sample) => {
        const [opIndex, ...args] = operation

        Object.keys(OPCODES)
          .filter(
            opcode =>
              OPCODES[opcode](before, args).join(',') === after.join(',')
          )
          .forEach(option => registry[opIndex].add(option))

        return registry
      },
      $.array(capacity).map(() => new Set<string>())
    )

  // The resolution goes as follow:
  // 1. Find the index of the non-resolved (set) which has a single entry.
  // 2. Rewrite that value as the only entry it contains.
  // 3. Go through all non-resolved entries (sets) and remove that option from
  //    their set.
  // 4. Repeat until every index has been associated to a value.
  while (registry.some(item => typeof item !== 'string')) {
    const opIndex = registry.findIndex((item: Set<string>) => item.size === 1)
    registry[opIndex] = Array.from(registry[opIndex]).pop()
    registry
      .filter(item => typeof item !== 'string')
      .forEach((item: Set<string>) => item.delete(registry[opIndex] as string))
  }

  return program.reduce(
    (registers, [opIndex, ...args]) =>
      OPCODES[registry[opIndex] as string](registers, args),
    [0, 0, 0, 0]
  )
}
