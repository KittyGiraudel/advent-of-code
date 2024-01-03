import $ from '../../helpers'

export const checksum = (input: string[], part2: boolean = false) =>
  $.sum(
    input.map(row => {
      const numbers = $.numbers(row)

      if (!part2) {
        return Math.max(...numbers) - Math.min(...numbers)
      }

      const pair = $.pairs(numbers)
        .flatMap(([a, b]) => [
          [a, b],
          [b, a],
        ])
        .find(([a, b]) => Number.isInteger(a / b)) as [number, number]

      return pair[0] / pair[1]
    })
  )
