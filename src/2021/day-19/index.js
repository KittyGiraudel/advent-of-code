const $ = require('../../helpers')

const findVector = (a, b) => [b[0] - a[0], b[1] - a[1], b[2] - a[2]]

class Scanner {
  constructor(scanner) {
    const [header, ...lines] = scanner.split('\n')

    this.id = +header.match(/(\d+)/)[1]
    this.beacons = lines.map(line => line.split(',').map(Number))
  }

  findVectorsBetweenBeacons() {
    const pairs = $.combinations(this.beacons, 2)
    const vectors = new Map()

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

const findOverlaps = (scannerA, scannerB) => {
  const overlaps = []
  const beaconPairs = Array.from({ length: scannerA.length }).map((_, i) => [
    scannerA.beacons[i],
    scannerB.beacons[i],
  ])

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

const parse = scanners => {
  return scanners.map(scanner => {
    const s = new Scanner(scanner)
    s.findVectorsBetweenBeacons()
    return s
  })
}

module.exports = { parse, findOverlaps }
