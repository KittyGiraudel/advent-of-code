import $ from '../../helpers'

export const run = (input: string[], a: number = 0) => {
  const registers = { a, b: 0 }
  let index = 0

  while (input[index]) {
    const line = input[index]
    const [op, x, y] = line.replace(',', '').split(' ')
    type Key = keyof typeof registers

    if (op === 'hlf') registers[x as Key] /= 2
    if (op === 'tpl') registers[x as Key] *= 3
    if (op === 'inc') registers[x as Key]++
    if (op === 'jmp') index += +x - 1
    if (op === 'jie' && registers[x as Key] % 2 === 0) index += +y - 1
    if (op === 'jio' && registers[x as Key] === 1) index += +y - 1

    index++
  }

  return registers
}
