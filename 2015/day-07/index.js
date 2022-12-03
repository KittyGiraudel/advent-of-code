const $ = require('../../helpers')

const OPERATORS = {
  AND: '&',
  OR: '|',
  NOT: '~',
  LSHIFT: '<<',
  RSHIFT: '>>',
}

const prepare = string => {
  for (let operator in OPERATORS)
    string = string.replace(operator, OPERATORS[operator])

  // Funnily enough, the `with (registers)` trick outlined in the article below
  // does not work because one of the keys is `do`, which is a reserved word in
  // JavaScript.
  // https://kittygiraudel.com/2022/01/21/exploiting-javascript-quirks-for-fun-and-profit/
  return string.replace(/[a-z]+/g, a => 'registers.' + a)
}

const run = (input, registers = {}) => {
  const graph = new Map()

  input.forEach(line => {
    const [left, right] = line.split(' -> ')

    if (isNaN(+left)) {
      graph.set(right, { deps: left.match(/[a-z]+/g), raw: left })
    } else if (!(right in registers)) {
      registers[right] = +left
    }
  })

  while (graph.size) {
    const keys = Array.from(graph.keys())
    const next = keys.find(key =>
      graph.get(key).deps.every(dep => dep in registers)
    )

    // This is how to keep bitwise NOT within the 0–65535 range.
    registers[next] = eval(prepare(graph.get(next).raw)) & 65535
    graph.delete(next)
  }

  return registers
}

module.exports = { run }
