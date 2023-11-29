import $ from '../../helpers'
import { Grid, Coords, Point } from '../../types'

const getBorderingSpace = (grid: Grid<string>, curr: Coords) => {
  const [N, E, S, W] = $.bordering(curr, 'COORDS')
  return [N, W, E, S].filter(
    neighbor => $.access(grid, neighbor) === '.'
  ) as Coords[]
}

class Unit {
  type: string
  power: number
  coords: Coords
  health: number

  constructor(type: string, coords: Coords, power: number = 3) {
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

  isAt(input: Point | Coords) {
    if (typeof input === 'string') return input === this.point
    if (typeof Array.isArray(input))
      return input[0] === this.y && input[1] === this.x
    return false
  }

  hurt(damage: number) {
    this.health -= damage
  }

  attack(units: Unit[]) {
    const getAliveEnemyAt = (position: Point | Coords) =>
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

  move(grid: Grid<string>, units: Unit[]) {
    const alive = units.filter(unit => unit.alive)
    const enemies = alive.filter(unit => unit.isEnemy(this.type))

    const graph = $.pathfinding.bfs({
      start: this.coords,
      getNextNodes: curr =>
        getBorderingSpace(grid, curr).filter(
          neighbor => !alive.find(unit => unit.isAt(neighbor))
        ),
      isGoal: curr =>
        getBorderingSpace(grid, curr).some(neighbor =>
          enemies.find(unit => unit.isAt(neighbor))
        ),
    })

    // If we found a target that we can reach, and we are not already in melee
    // range of it, move one step towards that target.
    if (graph.end) {
      const path = $.pathfinding.path(graph.from, this.coords, graph.end)
      const point = path.pop()

      if (point) this.coords = $.toCoords(point)
    }
  }

  findEnemy(units: Unit[]) {
    return units.find(unit => unit.isEnemy(this.type) && unit.alive)
  }

  takeTurn(grid: Grid<string>, units: Unit[]) {
    if (!this.alive) return true
    if (!this.findEnemy(units)) return false
    this.move(grid, units)
    this.attack(units)
    return true
  }
}

class Game {
  turns: number
  units: Unit[]
  grid: Grid<string>

  constructor(rows: string[], elvishPower: number = 3) {
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

export const battle = (rows: string[]) => {
  const game = new Game(rows)
  while (!game.done) game.round()
  return game.score
}

export const cheat = (rows: string[]) => {
  let elvishPower = 3

  while (true) {
    const game = new Game(rows, ++elvishPower)
    while (!game.done) game.round()
    if (game.perfect) return game.score
  }
}
