import $ from '../../helpers'

export const run = (input: string[], c: number = 0): number => {
  const registers = { a: 0, b: 0, c, d: 0 }
  const read = (key: string | number) => registers[key] || +key

  // Speed boost by doing the split only once.
  const instructions: string[][] = input.map(instruction =>
    instruction.split(' ')
  )

  for (let i = 0; i < instructions.length; i++) {
    const [code, x, y] = instructions[i]
    if (code === 'cpy') registers[y] = read(x)
    else if (code === 'inc') registers[x]++
    else if (code === 'dec') registers[x]--
    else if (code === 'jnz' && read(x)) i += read(y) - 1
  }

  return registers.a
}
