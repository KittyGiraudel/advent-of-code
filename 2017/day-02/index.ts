import $ from '../../helpers'

export const checksum = (input: string[], advanced: boolean = false) =>
  $.sum(
    input.map(row => {
      const numbers = $.numbers(row)

      if (!advanced) {
        return Math.max(...numbers) - Math.min(...numbers)
      }

      const pair = $.combinations(numbers, 2)
        .flatMap(([a, b]) => [
          [a, b],
          [b, a],
        ])
        .find(([a, b]) => Number.isInteger(a / b)) as [number, number]

      return pair[0] / pair[1]
    })
  )
