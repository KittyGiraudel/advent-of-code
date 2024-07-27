import $ from '../../helpers'

type Registers = Record<string, number>

const STR_RE = /[a-z]+/g
const OPERATORS = {
  AND: '&',
  OR: '|',
  NOT: '~',
  LSHIFT: '<<',
  RSHIFT: '>>',
}
type Operator = keyof typeof OPERATORS

const prepare = (string: string) => {
  for (const operator in OPERATORS)
    string = string.replace(operator, OPERATORS[operator as Operator])

  // Funnily enough, the `with (registers)` trick outlined in the article below
  // does not work because one of the keys is `do`, which is a reserved word in
  // JavaScript.
  // https://kittygiraudel.com/2022/01/21/exploiting-javascript-quirks-for-fun-and-profit/
  return string.replace(STR_RE, a => 'registers.' + a)
}

export const run = (input: string[], registers: Registers = {}) => {
  const graph = new Map<string, { deps: string[]; raw: string }>()

  input.forEach(line => {
    const [left, right] = line.split(' -> ')

    if (Number.isNaN(+left)) {
      graph.set(right, { deps: $.match(left, STR_RE), raw: left })
    } else if (!(right in registers)) {
      registers[right] = +left
    }
  })

  while (graph.size) {
    let next: string | undefined
    graph.forEach((value, key) => {
      if (value.deps.every(dep => dep in registers)) next = key
    })
    if (!next) break

    const value = graph.get(next)
    if (!value) break

    // This is how to keep bitwise NOT within the 0–65535 range.
    registers[next] = eval(prepare(value.raw)) & 65_535
    graph.delete(next)
  }

  return registers
}
