type Graph = Record<string, number>

/*
class Firewall {
  constructor(input) {
    this.layers = this.init(input)
    this.cache = $.clone(this.layers)
    this.risk = 0
  }

  init(input) {
    const firewall = []

    input.forEach(line => {
      const [depth, range] = line.split(':').map(Number)

      firewall[depth] = { length: range, position: 0, direction: +1 }
    })

    return firewall
  }

  reset() {
    this.layers = $.clone(this.cache)
    this.risk = 0
    return this
  }

  tick() {
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i]

      if (!layer) continue
      if (layer.position === 0) layer.direction = +1
      if (layer.position === layer.length - 1) layer.direction = -1

      layer.position += layer.direction
    }
  }

  cross() {
    for (let i = 0; i < this.layers.length; i++) {
      if (this.layers[i]?.position === 0) this.risk += i * this.layers[i].length
      this.tick()
    }
    return this
  }

  canCross() {
    for (let i = 0; i < this.layers.length; i++) {
      if (this.layers[i]?.position === 0) return false
      this.tick()
    }
    return true
  }

  wait(delay) {
    for (let i = 0; i < delay; i++) this.tick()
    return this
  }
}

const run = input => new Firewall(input).cross().risk

const cross = input => {
  const firewall = new Firewall(input)
  let i = 0
  while (!firewall.reset().wait(i).canCross()) i++
  return i
}
*/

const getGraph = (lines: Array<string>) =>
  lines.reduce((acc, line) => {
    const [depth, range] = line.split(':')
    acc[depth] = +range
    return acc
  }, {} as Graph)

const pass = (length: number, time: number) => time % ((length - 1) * 2)

export const run = (input: Array<string>) => {
  const graph = getGraph(input)

  return Array.from(Object.keys(graph))
    .filter(layer => !pass(graph[layer], +layer))
    .reduce((acc, layer) => acc + +layer * graph[layer], 0)
}

// I managed to solve part 1 as described in the puzzle (see `Firewall` class),
// but could not figure out how to solve part 2 without brute-force, so I
// resorted in implementing that Python solution:
// https://www.reddit.com/r/adventofcode/comments/7jgyrt/2017_day_13_solutions/dr6bxce/
export const cross = (input: Array<string>) => {
  const graph = getGraph(input)
  const layers = Object.keys(graph)
  let delay = 0

  while (layers.some(layer => !pass(graph[layer], delay + +layer))) delay++

  return delay
}
