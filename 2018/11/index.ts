import $ from '../../helpers'
import type { Coords, TriCoords } from '../../types'

const SIZE = 300

const computeCellPower = (serial: number, x: number, y: number) => {
  const rackID = x + 10
  const power = (rackID * y + serial) * rackID
  const hundreds = Math.floor(power / 100) % 10

  return hundreds - 5
}

const getGrid = (serial: number) =>
  new $.Grid(SIZE, SIZE, ([ri, ci]) => computeCellPower(serial, ri + 1, ci + 1))

export const getFuelStrict = (serial: number) => {
  const max = { value: Number.NEGATIVE_INFINITY, coords: [0, 0] as Coords }
  const grid = getGrid(serial)

  const square = (ci: number, ri: number, size = 3) =>
    $.sum(
      grid.rows.slice(ri, ri + size).flatMap(row => row.slice(ci, ci + size))
    )

  for (let ri = 0; ri < SIZE; ri++) {
    for (let ci = 0; ci < SIZE; ci++) {
      const value = square(ci, ri, 3)

      if (value > max.value) {
        max.value = value
        max.coords = [ri + 1, ci + 1]
      }
    }
  }

  return max
}

export const getFuelLoose = (serial: number) => {
  const max = {
    value: Number.NEGATIVE_INFINITY,
    coords: [0, 0, 0] as TriCoords,
  }
  const grid = getGrid(serial)
  const summed = grid.clone()

  // To be able to find the highest square of any size without having to iterate
  // 300 ^ 3 times on the grid (width * height * size — which would be O(n³)
  // just to even start computations, and O(n⁵) to actually get a result), we
  // need to use a summed table, as read on Reddit. The value at `summed[y][x]`
  // reports the sum of all points above and to the left of (y, x).
  // The following algorithm is inspired from this Ruby version:
  // https://www.reddit.com/r/adventofcode/comments/a53r6i/comment/ebjsc3u/?utm_source=reddit&utm_medium=web2x&context=3
  summed.forEach((value, [ri, ci]) => {
    const get = (...coords: Coords) => summed.get(coords) ?? 0

    summed.set(
      [ri, ci],
      value + get(ri - 1, ci) + get(ri, ci - 1) - get(ri - 1, ci - 1)
    )
  })

  for (let i = 1; i <= SIZE; i++) {
    const ranges = $.range(SIZE - i, 1)

    // Iterate over the Y axis.
    ranges.forEach(riMin => {
      const riMins = summed.row(riMin - 1)
      const riMaxes = summed.row(riMin - 1 + i)

      // Iterate over the X axis.
      ranges.forEach(ciMin => {
        const ciMax = ciMin + i - 1
        const power =
          riMaxes[ciMax] -
          riMins[ciMax] -
          riMaxes[ciMin - 1] +
          riMins[ciMin - 1]

        if (power > max.value) {
          max.value = power
          max.coords = [riMin + 1, ciMin + 1, i]
        }
      })
    })
  }

  return max
}
