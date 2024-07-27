export const run = (input: string[], c = 0) => {
  const registers = { a: 0, b: 0, c, d: 0 }
  type Key = keyof typeof registers
  const read = (key: string | number) => registers[key as Key] || +key

  // Speed boost by doing the split only once.
  const instructions: string[][] = input.map(instruction =>
    instruction.split(' ')
  )

  for (let i = 0; i < instructions.length; i++) {
    const [code, x, y] = instructions[i]
    if (code === 'cpy') registers[y as Key] = read(x)
    else if (code === 'inc') registers[x as Key]++
    else if (code === 'dec') registers[x as Key]--
    else if (code === 'jnz' && read(x)) i += read(y) - 1
  }

  return registers.a
}
