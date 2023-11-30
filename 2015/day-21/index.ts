import $ from '../../helpers'

type Cost = number
type Damage = number
type Armor = number
type Stats = [Cost, Damage, Armor]
type Gear = [Stats, Stats?, Stats?, Stats?]

/* Cost, Damage, Armor */
const WEAPONS: Stats[] = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
]

const ARMORS: Stats[] = [
  [0, 0, 0], // Lack of armor
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
]

const RINGS: Stats[] = [
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
  const gears: Gear[] = []
  const ringPairs: [Stats, Stats][] = $.combinations(RINGS, 2) as [
    Stats,
    Stats
  ][]

  WEAPONS.forEach(weapon => {
    gears.push([weapon])
    ARMORS.forEach(armor => {
      gears.push([weapon, armor])
      ringPairs.forEach(rings => {
        gears.push([weapon, armor, ...rings])
      })
    })
  })

  // Aggregate the stats of all the items in the gear (cost, damage, armor).
  return gears.map(items =>
    items.reduce(
      // @ts-ignore
      ([cost, damage, armor], [iCost, iDamage, iArmor]) => [
        cost + iCost,
        damage + iDamage,
        armor + iArmor,
      ],
      [0, 0, 0]
    )
  )
}

class Unit {
  health: number
  damage: number
  armor: number
  cost: number

  constructor(
    cost: number,
    damage: number,
    armor: number,
    health: number = 100
  ) {
    this.health = health
    this.damage = damage
    this.armor = armor
    this.cost = cost
  }

  get dead() {
    return this.health <= 0
  }

  defend(damage: number) {
    this.health -= Math.max(1, damage - this.armor)
  }

  attack(target: Unit) {
    target.defend(this.damage)
  }
}

class Fight {
  player: Unit
  boss: Unit

  constructor(player: number[], boss: number[]) {
    // @ts-ignore
    this.player = new Unit(...player)
    // @ts-ignore
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

export const run = (boss: number[]): [number, number] => {
  const gears = getCombinations() as Stats[]
  const matches = gears.map(gear => new Fight(gear, boss).resolve())

  return [
    Math.min(...matches.filter(match => match.won).map(match => match.score)),
    Math.max(...matches.filter(match => !match.won).map(match => match.score)),
  ]
}
