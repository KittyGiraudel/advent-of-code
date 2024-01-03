import $ from '../../helpers'

const getArrangements = (
  numbers: number[],
  target: number,
  curr: number[] = []
): number[][] => {
  if ($.sum(curr) === target) return [curr]
  if ($.sum(curr) > target) return []

  return numbers.reduce<number[][]>((acc, n, index) => {
    const nextNumbers = numbers.slice(index + 1)
    const set = getArrangements(nextNumbers, target, [...curr, n])

    return acc.concat(set)
  }, [])
}

export const run = (input: number[], target: number): [number, number] => {
  const arrangements = getArrangements(input, target)
  const min = Math.min(...arrangements.map(a => a.length))

  return [
    arrangements.length,
    arrangements.filter(a => a.length === min).length,
  ]
}

// Here is another version written much much later which I find a bit more
// readable and understandable (and which is probably faster on larger sets).
// The idea is to generate all arrangements of bottles of size N (starting from
// 1 until reaching the length of the input), and then checking if that
// arrangement meets the target by summing its components.
/*
const run = (input: number[], part2: boolean = false) => {
  let possibilities = 0

  for (let i = 1; i <= input.length; i++) {
    let subtotal = 0

    for (const combination of $.combinations(input, i)) {
      if ($.sum(combination) === 150) subtotal += 1
    }

    if (part2 && subtotal) return subtotal
    possibilities += subtotal
  }

  return possibilities
}
*/
