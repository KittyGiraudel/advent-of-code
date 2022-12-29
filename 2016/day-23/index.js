import $ from '../../helpers'

export const run = (instructions, a = 0) => {
  const registers = { a, b: 0, c: 0, d: 0 }
  const read = key => registers[key] || +key

  // Speed boost by doing the split only once.
  instructions = instructions.map(instruction => instruction.split(' '))

  for (let i = 0; i < instructions.length; i++) {
    const [code, x, y] = instructions[i]
    if (code === 'cpy' && y in registers) registers[y] = read(x)
    else if (code === 'inc' && x in registers) registers[x]++
    else if (code === 'dec' && x in registers) registers[x]--
    else if (code === 'jnz' && read(x)) i += read(y) - 1
    else if (code === 'tgl') {
      const j = i + read(x)
      const target = instructions[j]
      if (!target) continue
      if (target.length === 2) {
        if (target[0] === 'inc') target[0] = 'dec'
        else target[0] = 'inc'
      } else if (target.length === 3) {
        if (target[0] === 'jnz') target[0] = 'cpy'
        else target[0] = 'jnz'
      }
    }
  }

  return registers.a
}
