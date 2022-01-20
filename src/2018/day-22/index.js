const $ = require('../../helpers')

const getGeologicIndex = (x, y, target, depth) => {
  if ((x === 0 && y === 0) || (x === target[0] && y === target[1])) return 0
  if (y === 0) return x * 16807
  if (x === 0) return y * 48271
  return (
    getErosionLevel(x - 1, y, target, depth) *
    getErosionLevel(x, y - 1, target, depth)
  )
}

const getErosionLevel = $.memo(
  (x, y, target, depth) =>
    (getGeologicIndex(x, y, target, depth) + depth) % 20183
)

const getRiskLevel = (x, y, target, depth) =>
  getErosionLevel(x, y, target, depth) % 3

const getRisk = (depth, target) =>
  $.sum(
    $.grid.flatMap($.grid.init(target[0] + 1, target[1] + 1), (v, ri, ci) =>
      getRiskLevel(ci, ri, target, depth)
    )
  )

const getNeighbors = memo((x, y, width, height) =>
  $.neighbors
    .bordering(x, y)
    .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
)

const getDuration = (depth, target) => {
  const height = 5 + (target[1] + 1)
  const width = 50 + (target[0] + 1)
  const heap = [[0, 0, 0, 1]]
  const timeMap = new Map()

  while (heap.length) {
    const [min, x, y, tool] = heap.shift()
    const key = $.toPoint([x, y, tool])
    const bestTime = timeMap.get(key) || Infinity

    if (bestTime <= min) {
      continue
    }

    if (target[0] === x && target[1] === y && tool === 1) {
      return min
    }

    timeMap.set(key, min)

    for (let i = 0; i < 3; i++) {
      if (i !== tool && i !== getRiskLevel(x, y, target, depth)) {
        const bestTime = timeMap.get($.toPoint([x, y, i])) || Infinity
        if (bestTime > min + 7) heap.push([min + 7, x, y, i])
      }
    }

    getNeighbors(x, y, width, height)
      .filter(([x, y]) => getRiskLevel(x, y, target, depth) !== tool)
      .forEach(([x, y]) => {
        const bestTime = timeMap.get($.toPoint([x, y, tool])) || Infinity
        if (bestTime > min + 1) heap.push([min + 1, x, y, tool])
      })

    let hashes = heap
      .sort((a, b) => a[0] - b[0])
      .map(([min, ...params]) => $.toPoint(params))

    // Sort the heap by time, then keep only the best time for every hash.
    for (let i = 0; i < hashes.length; i++) {
      if (hashes.indexOf(hashes[i]) !== i) heap.splice(i, 1)
    }
  }
}

module.exports = { getRisk, getDuration }
