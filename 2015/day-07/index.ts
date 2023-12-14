type Graph = Map<string, { deps: RegExpMatchArray | null; raw: string }>
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
  for (let operator in OPERATORS)
    string = string.replace(operator, OPERATORS[operator as Operator])

  // Funnily enough, the `with (registers)` trick outlined in the article below
  // does not work because one of the keys is `do`, which is a reserved word in
  // JavaScript.
  // https://kittygiraudel.com/2022/01/21/exploiting-javascript-quirks-for-fun-and-profit/
  return string.replace(STR_RE, a => 'registers.' + a)
}

export const run = (input: string[], registers: Registers = {}) => {
  const graph: Graph = new Map()

  input.forEach(line => {
    const [left, right] = line.split(' -> ')

    if (isNaN(+left)) {
      graph.set(right, { deps: left.match(STR_RE), raw: left })
    } else if (!(right in registers)) {
      registers[right] = +left
    }
  })

  while (graph.size) {
    const keys = Array.from(graph.keys())
    const next = keys.find(key =>
      graph.get(key)!.deps!.every(dep => dep in registers)
    )!

    // This is how to keep bitwise NOT within the 0–65535 range.
    registers[next] = eval(prepare(graph.get(next)!.raw)) & 65_535
    graph.delete(next)
  }

  return registers
}
