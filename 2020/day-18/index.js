const PARENS_RE = /\(([^()]+)\)/
const ADD_RE = /(\d+) \+ (\d+)/
const MULTIPLY_RE = /(\d+) \* (\d+)/

// Compute the result of the input while resolving parens first (from the inner-
// most to the outermost), and then operations from left to right, regardless of
// expected precedence level.
// @param {String} input - Stringified operation
// @return {Number}
export const computeLoose = input => {
  let match = input.match(PARENS_RE)

  // First recursively resolve the content of parens (from innermost to
  // outermost).
  while (match !== null) {
    input = input.replace('(' + match[1] + ')', computeLoose(match[1]))
    match = input.match(PARENS_RE)
  }

  // Then split the parens-free input on symbols (while preserving them) to have
  // every individual component (number and symbols alike) as its own item, and
  // parse the numbers as such. Then iterate over chunks and process them left
  // to right.
  const [total] = input
    .split(' ')
    .map(value => +value || value)
    .reduce(
      ([total, operator], value) =>
        typeof value === 'string'
          ? [total, value]
          : [eval(total + operator + value), null],
      [0, null]
    )

  return total
}

// Recursive update the input string by finding the given expression, and
// replacing its content with the outcome of the replacer function.
// @param {String} input - Input string
// @param {RegExp} expression - Regular expression to look for
// @param {Function} replacer - Function to find the new value from the match
// @return {String}
const replace = (input, expression, replacer) =>
  expression.test(input)
    ? replace(input.replace(expression, replacer), expression, replacer)
    : input

// Compute the result of the input while resolving parens first (from the inner-
// most to the outermost), and then operations from with additions taking prece-
// dence over multiplications.
// @param {String} input - Stringified operation
// @return {Number}
export const computeStrict = input => {
  input = replace(input, PARENS_RE, (_, content) => computeStrict(content))
  input = replace(input, ADD_RE, (_, a, b) => +a + +b)
  input = replace(input, MULTIPLY_RE, (_, a, b) => +a * +b)

  return +input
}
