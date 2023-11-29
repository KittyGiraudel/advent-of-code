export const run = (input: Array<string>, c: number = 0) => {
  const registers = { a: 0, b: 0, c, d: 0 }
  const read = (key: string | number) => registers[key] || +key

  // Speed boost by doing the split only once.
  const instructions: Array<Array<string>> = input.map(instruction =>
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
