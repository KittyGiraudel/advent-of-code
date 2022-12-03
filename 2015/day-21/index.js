const $ = require('../../helpers')

/* Cost, Damage, Armor */
const WEAPONS = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
]

const ARMORS = [
  [0, 0, 0], // Lack of armor
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
]

const RINGS = [
  [0, 0, 0], // Lack of ring
  [0, 0, 0], // Lack of ring
  [25, 1, 0],
  [50, 2, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3],
]

// Generate all the possible combinations of equipment knowing that:
// - There must be 1 weapon.
// - There can be 0-1 armor.
// - There can be 0-2 rings.
const getCombinations = () => {
  const gears = []
  const ringPairs = $.combinations(RINGS, 2)

  WEAPONS.forEach(weapon => {
    gears.push([weapon])
    ARMORS.forEach(armor => {
      gears.push([weapon, armor])
      ringPairs.forEach(rings => gears.push([weapon, armor, ...rings]))
    })
  })

  // Aggregate the stats of all the items in the gear (cost, damage, armor).
  return gears.map(items =>
    items.reduce((gear, item) => $.zip(gear, item).map($.sum), [0, 0, 0])
  )
}

class Unit {
  constructor(cost, damage, armor, health = 100) {
    this.health = health
    this.damage = damage
    this.armor = armor
    this.cost = cost
  }

  get dead() {
    return this.health <= 0
  }

  defend(damage) {
    this.health -= Math.max(1, damage - this.armor)
  }

  attack(target) {
    target.defend(this.damage)
  }
}

class Fight {
  constructor(player, boss) {
    this.player = new Unit(...player)
    this.boss = new Unit(...boss)
  }

  get score() {
    return this.player.cost
  }

  get done() {
    return this.player.dead || this.boss.dead
  }

  get won() {
    return this.boss.dead
  }

  resolve() {
    const order = [this.boss, this.player]

    while (!this.done) {
      const [attacker, defender] = order.reverse()
      attacker.attack(defender)
    }

    return this
  }
}

const run = boss => {
  const gears = getCombinations()
  const matches = gears.map(gear => new Fight(gear, boss).resolve())

  return [
    Math.min(...matches.filter(match => match.won).map(match => match.score)),
    Math.max(...matches.filter(match => !match.won).map(match => match.score)),
  ]
}

module.exports = { run }
