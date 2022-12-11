const $ = require('../../helpers')
const yaml = require('js-yaml')

class Player {
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

const toYaml = block =>
  'data:\n' +
  block
    .toLowerCase()
    .replace(/monkey (\d+):/, '  id: $1')
    .replace(/(new|old)/g, 'item')
    .replace(/starting items: ([^\n]+)/, 'items: [$1]')
    .replace('divisible by ', '')
    .replace(/throw to monkey /g, '')
    .replace(/  if /g, '')

const play = (input, worried = false) => {
  const players = input.map(player => {
    const { data } = yaml.load(toYaml(player))

    return new Player({
      id: data.id,
      next: [data.true, data.false],
      predicate: data.test,
      items: data.items,
      operation: data.operation,
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

module.exports = { play }
