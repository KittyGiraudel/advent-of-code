import $ from '../../helpers'
import { Coords, Point } from '../../types'

const findVector = (a: Coords, b: Coords): Coords => [
  b[0] - a[0],
  b[1] - a[1],
  b[2] - a[2],
]

class Scanner {
  id: number
  beacons: Coords[]
  vectors: Map<Point, Set<Point>>

  constructor(scanner: string) {
    const [header, ...lines] = scanner.split('\n')

    this.id = +header.match(/(\d+)/)[1]
    this.beacons = lines.map($.toCoords)
  }

  findVectorsBetweenBeacons() {
    const pairs = $.combinations(this.beacons, 2)
    const vectors: Map<Point, Set<Point>> = new Map()

    pairs.forEach(([a, b]) => {
      const vectorsA = vectors.get($.toPoint(a)) || new Set()
      const vectorsB = vectors.get($.toPoint(b)) || new Set()

      vectorsA.add($.toPoint(findVector(a, b)))
      vectorsB.add($.toPoint(findVector(b, a)))

      vectors.set($.toPoint(a), vectorsA)
      vectors.set($.toPoint(b), vectorsB)
    })

    this.vectors = vectors
  }
}

export const findOverlaps = (scannerA: Scanner, scannerB: Scanner) => {
  const overlaps = new Map()
  const beaconPairs = Array.from({ length: scannerA.beacons.length }).map(
    (_, i) => [scannerA.beacons[i], scannerB.beacons[i]]
  )

  beaconPairs.forEach(([a, b]) => {
    const vectorsA = scannerA.vectors.get($.toPoint(a))
    const vectorsB = scannerB.vectors.get($.toPoint(b))

    const intersection = $.intersection(
      Array.from(vectorsA),
      Array.from(vectorsB)
    )

    if (intersection.length >= 12) {
      const overlapsA = overlaps.get($.toPoint(a))
      overlapsA.add($.toPoint(b))
      overlaps.set($.toPoint(a), overlapsA)
    }
  })

  return overlaps
}

export const parse = (scanners: string[]) => {
  return scanners.map(scanner => {
    const s = new Scanner(scanner)
    s.findVectorsBetweenBeacons()
    return s
  })
}
