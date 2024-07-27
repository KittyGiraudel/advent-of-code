import $ from '../../helpers'

type Sample = {
  operation: number[]
  before: number[]
  after: number[]
}

type Operation = (regs: number[], [A, B, C]: number[]) => number[]
const OPCODES: Record<string, Operation> = {
  addr: (regs, [A, B, C]) => $.replace(regs, C, regs[A] + regs[B]),
  addi: (regs, [A, B, C]) => $.replace(regs, C, regs[A] + B),
  mulr: (regs, [A, B, C]) => $.replace(regs, C, regs[A] * regs[B]),
  muli: (regs, [A, B, C]) => $.replace(regs, C, regs[A] * B),
  banr: (regs, [A, B, C]) => $.replace(regs, C, regs[A] & regs[B]),
  bani: (regs, [A, B, C]) => $.replace(regs, C, regs[A] & B),
  borr: (regs, [A, B, C]) => $.replace(regs, C, regs[A] | regs[B]),
  bori: (regs, [A, B, C]) => $.replace(regs, C, regs[A] | B),
  setr: (regs, [A, B, C]) => $.replace(regs, C, regs[A]),
  seti: (regs, [A, B, C]) => $.replace(regs, C, A),
  gtir: (regs, [A, B, C]) => $.replace(regs, C, +(A > regs[B])),
  gtri: (regs, [A, B, C]) => $.replace(regs, C, +(regs[A] > B)),
  gtrr: (regs, [A, B, C]) => $.replace(regs, C, +(regs[A] > regs[B])),
  eqir: (regs, [A, B, C]) => $.replace(regs, C, +(A === regs[B])),
  eqri: (regs, [A, B, C]) => $.replace(regs, C, +(regs[A] === B)),
  eqrr: (regs, [A, B, C]) => $.replace(regs, C, +(regs[A] === regs[B])),
}
type Opcode = keyof typeof OPCODES

const parseSample = ([before, op, after]: string[]) =>
  ({
    operation: op.split(' ').map(Number),
    before: JSON.parse(before.replace('Before: ', '')),
    after: JSON.parse(after.replace('After: ', '')),
  }) as Sample

export const debug = (input: string[]) => {
  const capacity = Object.keys(OPCODES).length
  const program = input[input.length - 1]
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
              OPCODES[opcode as Opcode](before, args).join(',') ===
              after.join(',')
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
    const opIndex = registry.findIndex(
      item => item instanceof Set && item.size === 1
    )
    registry[opIndex] = Array.from(registry[opIndex]).pop()!
    registry
      .filter((item): item is Set<string> => typeof item !== 'string')
      .forEach(item => item.delete(registry[opIndex] as string))
  }

  return program.reduce(
    (registers, [opIndex, ...args]) =>
      OPCODES[registry[opIndex] as string](registers, args),
    [0, 0, 0, 0]
  )
}
