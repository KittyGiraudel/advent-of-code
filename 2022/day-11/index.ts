import $ from '../../helpers'

class Player {
  id: string
  items: number[]
  operation: string
  predicate: number
  next: [string, string]
  inspections: number

  constructor({ id, operation, predicate, next, items }) {
    this.id = id
    this.items = items
    this.operation = operation
    this.predicate = predicate
    this.next = next
    this.inspections = 0
  }

  play(lcd = 0) {
    this.inspections++

    let item = this.items.shift()
    eval(this.operation)

    if (lcd) item %= lcd
    else item = Math.floor(item / 3)

    return {
      next: item % this.predicate === 0 ? this.next[0] : this.next[1],
      item,
    }
  }

  receive(item) {
    this.items.push(item)
  }
}

class Game {
  players: Player[]
  lcd: number

  constructor(players, lcd = 0) {
    this.players = players
    this.lcd = lcd
  }

  getPlayerById(id) {
    return this.players.find(player => player.id === id)
  }

  round() {
    this.players.forEach(player => {
      while (player.items.length) {
        const { next, item } = player.play(this.lcd)
        this.getPlayerById(next).receive(item)
      }
    })
  }

  rounds(amount) {
    for (let i = 1; i <= amount; i++) this.round()
  }

  getMonkeyBusinessLevel() {
    return $.product(
      this.players
        .map(player => player.inspections)
        .sort((a, b) => b - a)
        .slice(0, 2)
    )
  }
}

export const play = (input: string[], worried: boolean = false): number => {
  const players = input.map(player => {
    // Courtesy of my brother: https://github.com/lgiraudel/advent-of-code/commit/05327d1fdd617003a3ca010d12119751b87c71dd#diff-5d9f4737b2b36f0267499d0e02982aa39794afb4facb7d805983ad3975fd355eR12
    const regex =
      /Monkey (?<id>\d):\n\s*Starting items: (?<items>\d+(?:, \d+)*)\n\s*Operation: (?<operation>.*)\n\s*Test: divisible by (?<predicate>\d+)\n\s*If true: throw to monkey (?<true>\d)\n\s*If false: throw to monkey (?<false>\d)/gm
    const { groups } = regex.exec(player)

    return new Player({
      id: +groups.id,
      next: [+groups.true, +groups.false],
      predicate: +groups.predicate,
      items: groups.items.split(', ').map(Number),
      operation: groups.operation.replace(/(new|old)/g, 'item'),
    })
  })

  // Truth be told I had to read Reddit to figure out that part. I went pretty
  // far with a BigInt implementation but I got slightly off results so I had to
  // give up.
  const lcd = worried ? $.product(players.map(player => player.predicate)) : 0
  const game = new Game(players, lcd)

  game.rounds(worried ? 10_000 : 20)

  return game.getMonkeyBusinessLevel()
}
