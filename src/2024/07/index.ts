import $ from '../../helpers'

type Equation = (string | number)[]

const OPERATIONS: Record<string, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '|': (a, b) => a * 10 ** String(b).length + b,
}

const getEquations = (items: number[], symbols: string[]) => {
  let equations: Equation[] = [[items[0]]]

  for (let i = 1; i < items.length; i++) {
    const number = items[i]

    equations = equations.flatMap(equation =>
      symbols.map(symbol => [...equation, symbol, number])
    )
  }

  return equations
}

// Taken almost verbatim from 2020/18, but optimized for speed for part 2 by
// trading `eval` for an operator map, and avoiding splitting strings on regular
// expressions.
const isEquationValid = (equation: Equation, target: number) => {
  let total = 0
  let operator = '+'

  for (let i = 0; i < equation.length; i++) {
    const value = equation[i]
    if (typeof value === 'string') operator = value
    else total = OPERATIONS[operator](total, value)
    // Numbers only go up, so if we’re ever above the target, we can cut early
    if (total > target) return false
  }

  return total === target
}

export const run = (input: string[], part2 = false) => {
  const symbols = part2 ? ['+', '*', '|'] : ['+', '*']

  return input.reduce((acc, line) => {
    const [result, ...items] = $.numbers(line)
    const equations = getEquations(items, symbols)
    const isValid = equations.some(equation =>
      isEquationValid(equation, result)
    )

    return isValid ? acc + result : acc
  }, 0)
}
