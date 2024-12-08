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

export const ogRun = (input: string[], part2 = false) => {
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

// This is an alternative solution implemented following this video tutorial.
// See: https://www.youtube.com/watch?v=1ZIJ9qo9bnY
// Although it doesn’t come naturally to me, it has the advantage of being
// significantly faster because it does not start by computing all possible
// equations for a given line only to filter out the invalid ones. Instead it
// backtracks whether a line can be solved by recursively decomposing it into
// steps.
export const run = (input: string[], part2 = false) => {
  const canObtain = (result: number, items: number[]) => {
    // This function is recursive, so we only really check the last value at any
    // given time. All the other preceding values (if any) are ignored, and will
    // be dealt with subsequently.
    const last = items[items.length - 1]
    const rest = items.slice(0, -1)

    // If we have reach the last value in the array, the line is valid only if
    // that last value is equal to the target. That’s because the final step of
    // unwrapping the line into recursive steps.
    if (items.length === 1) return last === result

    // To test whether using `*` before the last value would yield a valid
    // equation, we start by checking whether the result is a multiple of that
    // last value. If it’s not, then there is no way that equation works. If it
    // is, we can continue unfolding by reducing our target, and dropping that
    // last value  from our array of values, and go deeper.
    if (result % last === 0 && canObtain(Math.floor(result / last), rest))
      return true

    // Similarly, to test whether using `+` before the last item would yield a
    // valid equation, we start by checking whether the result is bigger than
    // the last value. If it’s not, then there is no way that equation works. If
    // it is, we can continue unfolding by reducing our target, and dropping
    // that last value from our array of values, and go deeper.
    if (result > last && canObtain(result - last, rest)) return true

    // For part 2, we have a third type of operator (`||`) to concatenate values
    // together. To test whether using `||` before the last item would yield a
    // valid equation, we start by checking whether the result is longer than
    // the last value. If it’s not, then there is no way that equation works.
    // Then we check whether the result ends with the last value (because it is
    // a concatenation). If it’s not, then there is no way that equation works.
    // If it is, we can continue unfolding by reducing our target, and dropping
    // that last value from our array of values, and go deeper.
    const sResult = String(result)
    const sLast = String(last)
    if (
      part2 &&
      sResult.length > sLast.length &&
      sResult.endsWith(sLast) &&
      canObtain(Number(sResult.slice(0, -sLast.length)), rest)
    )
      return true

    // If everything failed, then there is no way to solve that line.
    return false
  }

  return input.reduce((acc, line) => {
    const [result, ...items] = $.numbers(line)
    return acc + (canObtain(result, items) ? result : 0)
  }, 0)
}
