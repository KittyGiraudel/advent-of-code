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
