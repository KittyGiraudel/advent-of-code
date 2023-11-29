import $ from '../../helpers'

export const checksum = (input: Array<string>, advanced: boolean = false) =>
  $.sum(
    input.map(row => {
      const numbers = row.split(/\s+/g).map(Number)

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
