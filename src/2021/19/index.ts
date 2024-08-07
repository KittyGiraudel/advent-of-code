import $ from '../../helpers'
import type { Coords, Point } from '../../types'

class Scanner {
  points: Point[]
  coords: Coords[]

  constructor(raw: string) {
    const lines = raw.split('\n')
    this.points = lines.slice(1) as Point[]
    this.coords = this.points.map($.toCoords)
  }

  scan() {}
}

export const parse = (input: string[]) => {
  const scanners = input.map(raw => new Scanner(raw))
  const pairs = $.pairs(scanners)
}
