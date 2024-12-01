import $ from '../../helpers'

export const run = (input: string[], part2 = false) => {
  const rows = input.map($.numbers)
  const [left, right] = $.range(rows[0].length).map(ci =>
    $.column(rows, ci).sort((a, b) => a - b)
  )
  const frequencies = $.frequency(right)

  return part2
    ? left.reduce((acc, number) => acc + number * (frequencies[number] ?? 0), 0)
    : rows.reduce(
        (acc, _, index) => acc + Math.abs(left[index] - right[index]),
        0
      )
}
