import $ from '../../helpers'

export const run = (
  input: string[],
  a: number = 0
): { a: number; b: number } => {
  const registers = { a, b: 0 }
  let index = 0

  while (input[index]) {
    const line = input[index]
    const [op, x, y] = line.replace(',', '').split(' ')

    if (op === 'hlf') registers[x] /= 2
    if (op === 'tpl') registers[x] *= 3
    if (op === 'inc') registers[x]++
    if (op === 'jmp') index += +x - 1
    if (op === 'jie' && registers[x] % 2 === 0) index += +y - 1
    if (op === 'jio' && registers[x] === 1) index += +y - 1

    index++
  }

  return registers
}
