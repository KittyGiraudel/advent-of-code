type Map = {
  [key: string]: number | string
  root?: number | string
}

const parseInput = (input: string[]): Map =>
  input.reduce((acc, line) => {
    const [name, value] = line.split(': ')
    acc[name] = +value || value
    return acc
  }, {})

// The `getRootNumber` solves part 1. It creates a map from the input, and then
// it reduces it until we have found the number for the `root` key. The array
// check was for part 2, because the brute-force version I initially wrote
// relied on that function, but passed it a parsed map already.
export const getRootNumber = (input: Map | string[]): number => {
  const map = Array.isArray(input) ? parseInput(input) : input

  while (typeof map.root !== 'number') reduceNext(map)

  return map.root
}

// Find the next map entry whose value is a number.
const getNextNumber = (map: Map): [string, number] =>
  Object.entries(map).find(([, value]) => typeof value === 'number') as [
    string,
    number
  ]

// Reduce the map 1 time by finding the next entry whose value is a number, and
// replacing every other value that mentions its key with its value.
const reduceNext = (map: Map) => {
  const [nextKey, nextValue] = getNextNumber(map)

  // Iterate on the map and look for the values that contain the current key. In
  // each expression, replace the current key by the current value, and if the
  // expression is now only made of numbers, evaluate it.
  for (let key in map) {
    const value = map[key]

    if (typeof value === 'string' && value.includes(nextKey)) {
      map[key] = value.replace(nextKey, String(nextValue))
      // I tried a few versions in an attempt to optimize for speed here: be it
      // try/catching the `eval` call, testing the value with a regex to look
      // for absence of words… Ultimately they’re all as fast/slow.
      try {
        map[key] = eval(String(map[key]))
      } catch {}
    }
  }

  delete map[nextKey]
}

// This version was my original attempt at part 2 and actually how I solved it,
// although with manual assistance. The idea is to reduce the map as much as
// possible to begin with, which means leaving it with nothing but expressions
// for values. From there, assign a numeric value to the `humn` key and reduce
// the map all the way until we end up with a boolean for the `root` key.
// Repeat with a higher `humn` value until getting `true`.
//
// I went all the way to 1,000,000 before rethinking my approach. To find the
// right number, I logged the root expression just before the evaluation to a
// boolean. That gave me something like `58602677743358 == 23622695042414`. From
// there, I tried modifying `i` to figure out what kind of number we’re looking
// at: big. It’s a big number. Then I played with the individual digits in order
// to solve them in order. Basically trying to get the first 2, then a 3, then a
// 6, and so on and so forth until I was close enough that I could brute-force
// the actual number within a few seconds.
export const getHumnNumberByBruteForce = input => {
  let { humn, ...map } = parseInput(input)

  // By replacing the `+` sign with a `-` sign, we should be getting a `0` for
  // `root` given the right `humn` value — which enables us to reuse the
  // `getRootNumber` we wrote for part 1.
  map.root = String(map.root).replace('+', '-')

  while (getNextNumber(map)) reduceNext(map)

  humn = 0

  while (getRootNumber({ ...map, humn })) humn++

  return humn
}

// Even though I solved it with manually-assisted brute-force, I was curious
// about the right way to do it, so I solved it by hand next. Interestingly
// enough, this Reddit comment explains almost verbatim how I solved it:
// https://www.reddit.com/r/adventofcode/comments/zrbw7n/comment/j149790/?utm_source=share&utm_medium=web2x&context=3
//
// Here is my short explanation: I started from the processed map (no more
// numeric values, only expressions), layed them out in order from the one
// relying on `humn` to the `root` one. Then I backtracked from the last one
// until I found the right value for the `humn` key. After having done that
// manually, I managed to write an automated version of the logic, thereafter.
//
// I’ve later on read on Reddit that a lot of people have created that monstrous
// meta-expression programmatically (instead of by hand like I did) with a
// function like this:
//   const getExpression = (map, key = 'root') => {
//     const value = (map[key] || key).split(' ')
//     return value.length === 1
//       ? value
//       : '(' + value.map(p => getExpression(map, p)).join(' ') + ')'
//   }
// Then, they used a binary search to find the right value for `humn` in that
// expression. This is a cool approach, and significantly more performant than
// what I’ve done.
export const getHumnNumber = input => {
  const { humn, ...map } = parseInput(input)

  while (getNextNumber(map)) reduceNext(map)

  let value = +String(map.root).match(/(\d+)/)[1]
  let [, curr] = String(map.root).match(/([a-z]+)/)

  // We walk up the operation chain until we reach the `humn` key. The idea is
  // that we reverse the current operation to find the previous number. For
  // instance if we have `a = b / 4`, we can find `b` (the next one), by
  // multiplying the current value by 4.
  while (curr !== 'humn') {
    const [a, operator, b] = String(map[curr]).split(' ')
    const next = isNaN(+a) ? a : b
    const number = !isNaN(+b) ? +b : +a

    if (operator === '*') value /= number
    if (operator === '+') value -= number

    // Small edge cases to deal with: if the expression is in the form of
    // `a = x - b` or `a = x / b` where x is the number, the operation should
    // actually *not* be reversed but kept as is.
    // E.g. 10 = 20 / b is the same as b = 20 / 10, not b = 10 / 20
    // E.g. 10 = 20 - b is the same as b = 20 - 10, not b = 10 - 20
    if (operator === '/') {
      if (!isNaN(+a)) value = number / value
      else value *= number
    }

    if (operator === '-') {
      if (!isNaN(+a)) value = number - value
      else value += number
    }

    curr = next
  }

  return value
}
