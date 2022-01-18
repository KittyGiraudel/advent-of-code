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
      const vectorsA = vectors.get(a.join(',')) || new Set()
      const vectorsB = vectors.get(b.join(',')) || new Set()

      vectorsA.add(findVector(a, b).join(','))
      vectorsB.add(findVector(b, a).join(','))

      vectors.set(a.join(','), vectorsA)
      vectors.set(b.join(','), vectorsB)
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
    const vectorsA = scannerA.vectors.get(a.join(','))
    const vectorsB = scannerB.vectors.get(b.join(','))

    const intersection = $.intersection(
      Array.from(vectorsA),
      Array.from(vectorsB)
    )

    if (intersection.length >= 12) {
      const overlapsA = overlaps.get(a.join(','))
      overlapsA.add(b.join(','))
      overlaps.set(a.join(','), overlapsA)
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
