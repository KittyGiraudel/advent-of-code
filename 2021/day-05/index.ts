import $ from '../../helpers'

export const getOverlappingPoints = (
  lines: string[],
  withDiagonals: boolean = false
) => {
  // Break down every line into a pair of vectors, each vector being a pair of
  // number (x,y coordinates).
  const vectors = lines.map(line => line.split(' -> ').map($.toCoords))

  const map = vectors.reduce((acc, vector) => {
    const [start, end] = vector
    const bump = (x: number, y: number) =>
      acc.set(`${x},${y}`, (acc.get(`${x},${y}`) || 0) + 1)
    const min = Math.min.bind(Math)
    const max = Math.max.bind(Math)
    const abs = Math.abs.bind(Math)

    // Handle vertical lines
    if (start[0] === end[0]) {
      for (let y = min(start[1], end[1]); y <= max(start[1], end[1]); y++)
        bump(start[0], y)
    }

    // Handle horizonal lines
    else if (start[1] === end[1]) {
      for (let x = min(start[0], end[0]); x <= max(start[0], end[0]); x++)
        bump(x, start[1])
    }

    // Handle diagonal lines
    else if (
      withDiagonals &&
      (start[0] + start[1] === end[0] + end[1] ||
        abs(start[0] - start[1]) === abs(end[0] - end[1]))
    ) {
      for (let x = min(start[0], end[0]); x <= max(start[0], end[0]); x++) {
        for (let y = min(start[1], end[1]); y <= max(start[1], end[1]); y++) {
          if (
            x + y === start[0] + start[1] ||
            x - y === start[0] - start[1] ||
            y - x === start[1] - start[0]
          )
            bump(x, y)
        }
      }
    }

    return acc
  }, new Map())

  return Array.from(map.values()).filter(value => value > 1).length
}
