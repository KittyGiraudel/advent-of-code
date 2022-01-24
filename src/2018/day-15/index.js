const $ = require('../../helpers')

class Unit {
  constructor(type, coords, power = 3) {
    this.type = type
    this.power = power
    this.coords = coords
    this.health = 200
  }

  get position() {
    return this.coords
  }

  get y() {
    return this.coords[0]
  }

  get x() {
    return this.coords[1]
  }

  get point() {
    return $.toPoint(this.coords)
  }

  get neighbors() {
    const [N, E, S, W] = $.bordering(this.position, 'COORDS')
    return [N, W, E, S]
  }

  get alive() {
    return this.health > 0
  }

  isEnemy(type) {
    return type !== this.type
  }

  isAt(input) {
    if (typeof input === 'string') return input === this.point
    if (typeof Array.isArray(input))
      return input[0] === this.y && input[1] === this.x
    return false
  }

  hurt(damage) {
    this.health -= damage
  }

  attack(units) {
    const getAliveEnemyAt = position =>
      units.find(
        unit => unit.alive && unit.isEnemy(this.type) && unit.isAt(position)
      )

    this.neighbors
      .map(getAliveEnemyAt)
      .filter(Boolean)
      .sort((a, b) => a.health - b.health)
      .shift()
      ?.hurt(this.power)
  }

  move(grid, units) {
    const next = findMove(grid, units, this.point, this.type)

    if (next) this.coords = next
  }

  findEnemy(units) {
    return units.find(unit => unit.isEnemy(this.type) && unit.alive)
  }

  takeTurn(grid, units) {
    if (!this.alive) return true
    if (!this.findEnemy(units)) return false
    this.move(grid, units)
    this.attack(units)
    return true
  }
}

class Game {
  constructor(rows, elvishPower = 3) {
    this.turns = 0
    this.units = []
    this.grid = $.grid.create(rows, (value, ri, ci) => {
      if (value === 'G' || value === 'E') {
        const power = value === 'E' ? elvishPower : 3
        const unit = new Unit(value, [ri, ci], power)
        this.units.push(unit)
        return '.'
      }
      return value
    })
  }

  get score() {
    const healths = this.units
      .filter(unit => unit.alive)
      .map(unit => unit.health)

    return this.turns * $.sum(healths)
  }

  get done() {
    return (
      this.getUnitsFromType('E').every(elf => !elf.alive) ||
      this.getUnitsFromType('G').every(goblin => !goblin.alive)
    )
  }

  get perfect() {
    return (
      this.getUnitsFromType('E').every(elf => elf.alive) &&
      this.getUnitsFromType('G').every(goblin => !goblin.alive)
    )
  }

  round() {
    if (
      this.units
        .sort((a, b) => a.y - b.y || a.x - b.x)
        .every(unit => unit.takeTurn(this.grid, this.units))
    )
      this.turns++
  }

  getUnitsFromType(type) {
    return this.units.filter(unit => unit.type === type)
  }

  render() {
    const turn = 'Turn: ' + this.turns
    const map = $.grid.render(
      $.grid.map(this.grid, (value, ...position) => {
        const unit = this.units.find(unit => unit.isAt(position) && unit.alive)
        return unit?.type ?? value
      })
    )

    return ['', turn, map].join('\n')
  }
}

const battle = rows => {
  const game = new Game(rows)
  while (!game.done) game.round()
  return game.score
}

const cheat = rows => {
  let elvishPower = 3

  while (true) {
    const game = new Game(rows, ++elvishPower)
    while (!game.done) game.round()
    if (game.perfect) return game.score
  }
}

// I originally drafted a pretty convoluted solution using the `pathfinding`
// library. Even though I managed to have all tests passing + the correct result
// for part 1, I couldn’t find the right result for part 2. That’s because I
// couldn’t solve all tie-breaks exactly like the puzzle intended it, since the
// library is ultimately only about finding the shortest path. So I ended up
// looking for a moving algorithm on Reddit to solve part 2 and found this one
// (adapted from Python):
// https://www.reddit.com/r/adventofcode/comments/a6chwa/2018_day_15_solutions/ebu4jmx/
const findMove = (grid, units, start, type) => {
  const queue = [start]
  const visited = new Map()
  let curr = null

  while (true) {
    if (queue.length === 0) return null
    curr = queue.pop()

    const [N, E, S, W] = $.bordering($.toCoords(curr), 'BOTH')
    const neighbors = [N, W, E, S].filter(
      ({ coords }) => $.access(grid, coords) === '.'
    )

    for (let i = 0; i < neighbors.length; i++) {
      let next = neighbors[i].point
      const unit = units.find(unit => unit.isAt(next) && unit.alive)

      if (unit?.isEnemy(type)) {
        // Immediate melee target found so no movement required.
        if (curr === start) return null
        // Backtrack the path to the starting node.
        next = curr
        while (visited.get(next) !== start) next = visited.get(next)
        return $.toCoords(next)
      }

      if (!unit && !visited.has(next)) {
        queue.unshift(next)
        visited.set(next, curr)
      }
    }
  }
}

module.exports = { battle, cheat }
