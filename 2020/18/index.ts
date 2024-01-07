const PARENS_RE = /\(([^()]+)\)/
const ADD_RE = /(\d+) \+ (\d+)/
const MULTIPLY_RE = /(\d+) \* (\d+)/
const OPERATOR_RE = /([+*])/g

// Compute the result of the input while resolving parens first (from the inner-
// most to the outermost), and then operations from left to right, regardless of
// expected precedence level.
// @param input - Stringified operation
export const computeLoose = (input: string) => {
  // First recursively resolve the content of parens (from innermost to
  // outermost).
  input = replace(input, PARENS_RE, (_, c) => String(computeLoose(c)))

  // Then split the parens-free input on symbols (while preserving them) to have
  // every individual component (number and symbols alike) as its own item, and
  // parse the numbers as such. Then iterate over chunks and process them left
  // to right.
  const [total] = input
    .split(OPERATOR_RE)
    .map(value => (isNaN(+value) ? value : +value))
    .reduce<[number, string | null]>(
      ([total, operator], value) =>
        typeof value === 'string'
          ? [total, value]
          : [eval(total + (operator as string) + value), null],
      [0, null]
    )

  return total
}

// Recursive update the input string by finding the given expression, and
// replacing its content with the outcome of the replacer function.
// @param input - Input string
// @param expression - Regular expression to look for
// @param replacer - Function to find the new value from the match
const replace = (
  input: string,
  expression: RegExp,
  replacer: (substring: string, ...args: string[]) => string
): string =>
  expression.test(input)
    ? replace(input.replace(expression, replacer), expression, replacer)
    : input

// Compute the result of the input while resolving parens first (from the inner-
// most to the outermost), and then operations from with additions taking prece-
// dence over multiplications.
// @param input - Stringified operation
export const computeStrict = (input: string) => {
  // After having solved it myself, I found this approach on Reddit which I
  // think is super clever as well. Basically, it surrounds operators with
  // parenthesis to manipulate the operation order: single parens for +, double
  // for *, which causes additions to be resolved first. Brilliant.
  // E.g.: (8 + 8 + 3) * 7 + (7 * 7 + 7)
  //       -> (( (8 )+( 8 )+( 3) ))*(( 7 )+( (7 ))*(( 7 )+( 7) ))
  //       -> (( (8) + (8) + (3) )) * ((7) + ((7)) * ((7) + (7) ))
  //       -> (8 + 8 + 3) * (7 + 7 * (7 + 7))
  //       -> 19 * (7 + 7 * 14)
  //       -> 19 * (7 + 98)
  //       -> 19 * 105
  //       -> 1995
  // See: https://www.reddit.com/r/adventofcode/comments/kfeldk/comment/gg88lqc/
  // return eval('((' + input.replace(/\+/g, ')+(').replace(/\*/g, '))*((') + '))')

  input = replace(input, PARENS_RE, (_, c) => String(computeStrict(c)))
  input = replace(input, ADD_RE, (_, a, b) => String(+a + +b))
  input = replace(input, MULTIPLY_RE, (_, a, b) => String(+a * +b))

  return +input
}
