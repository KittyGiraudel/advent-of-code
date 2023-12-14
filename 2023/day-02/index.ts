import $ from '../../helpers'

type Game = { id: number; draws: Set[] }
type Set = { red: number; green: number; blue: number }
type Color = keyof Set

const aggregateSet = (set: Set, item: string) => {
  const [count, color] = item.split(' ')
  set[color as Color] += +count
  return set
}

const parseDraws = (items: string) =>
  items
    .trim()
    .split(', ')
    .reduce<Set>(aggregateSet, { red: 0, green: 0, blue: 0 })

const parseGame = (line: string) =>
  ({
    id: +line.split(':')[0].replace('Game ', ''),
    draws: line.split(':')[1].split('; ').map(parseDraws),
  } as Game)

const aggregateMaxSet = (set: Set, item: Set) => ({
  red: Math.max(set.red, item.red),
  green: Math.max(set.green, item.green),
  blue: Math.max(set.blue, item.blue),
})

export const run = (input: string[], advanced: boolean = false) => {
  const games = input.map(parseGame)

  // For part 1, find every game with *every* one of its draws being valid (as
  // in under the given arbitrary threshold). Then, sum all the game IDs
  // together to find the result.
  if (!advanced) {
    const isValidDraw = ({ red, green, blue }: Set) =>
      red <= 12 && green <= 13 && blue <= 14
    const validGames = games.filter(game => game.draws.every(isValidDraw))
    const ids = validGames.map(game => game.id)

    return $.sum(ids)
  }

  // For part 2, find the maximum value of each color across its draws,
  // essentially transforming a game into a unique set. Then, multiply the
  // values of each draw together to have a checksum per game. Finally, sum all
  // checksums for the final result.
  const set = { red: 0, green: 0, blue: 0 }
  const sets = games.map(game => game.draws.reduce(aggregateMaxSet, set))
  const checksums = sets.map(draw => $.product(Object.values(draw)))

  return $.sum(checksums)
}
