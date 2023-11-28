import $ from '../../helpers'
import { Coords, Point } from '../../types'

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

const parse = (input: string[]) => {
  const scanners = input.forEach(raw => new Scanner(raw))
  const pairs = $.combinations(scanners, 2)
}
