export const run = (input: string[], a = 0) => {
  const registers = { a, b: 0 }
  let index = 0

  while (input[index]) {
    const line = input[index]
    const [op, x, y] = line.replace(',', '').split(' ')
    const key = x as keyof typeof registers

    if (op === 'hlf') registers[key] /= 2
    if (op === 'tpl') registers[key] *= 3
    if (op === 'inc') registers[key]++
    if (op === 'jmp') index += +x - 1
    if (op === 'jie' && registers[key] % 2 === 0) index += +y - 1
    if (op === 'jio' && registers[key] === 1) index += +y - 1

    index++
  }

  return registers
}
