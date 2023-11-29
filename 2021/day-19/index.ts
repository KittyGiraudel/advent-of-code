import $ from '../../helpers'
import { Coords, Point } from '../../types'

class Scanner {
  points: Array<Point>
  coords: Array<Coords>

  constructor(raw: string) {
    const lines = raw.split('\n')
    this.points = lines.slice(1) as Array<Point>
    this.coords = this.points.map($.toCoords)
  }

  scan() {}
}

const parse = (input: Array<string>) => {
  const scanners = input.forEach(raw => new Scanner(raw))
  const pairs = $.combinations(scanners, 2)
}
