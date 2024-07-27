import $ from '../../helpers'

const TYPES = ['5', '41', '32', '311', '221', '2111', '11111'] as const

type HandType = (typeof TYPES)[number]
type Cards = `${string},${string},${string},${string},${string}`
type Hand = { cards: Cards; bet: number; type: HandType }

const isType = (type: HandType, cards: Cards) =>
  Object.values($.frequency(cards))
    .sort((a, b) => b - a)
    .join('') === type

const sortHands = (order: string) => (a: Hand, b: Hand) => {
  const typeCheck = TYPES.indexOf(a.type) - TYPES.indexOf(b.type)

  if (typeCheck) return typeCheck

  for (let i = 0; i < a.cards.length; i++) {
    const strengthCheck = order.indexOf(a.cards[i]) - order.indexOf(b.cards[i])
    if (strengthCheck) return strengthCheck
  }

  return 0
}

const resolveJokers = (cards: Cards) => {
  const frequency = $.frequency(cards)
  const others = Object.keys(frequency).filter(key => key !== 'J')
  const [mostFrequent] = others.sort((a, b) => frequency[b] - frequency[a])

  // My first implementation was much *much* longer than this (although working
  // perfectly). I checked every hand type individually, and then refactored and
  // refactored and refactored until I read up that the best use of a joker is
  // to replace it by the most frequent (non-joker) card in the hand.
  return cards.replace(/J/g, mostFrequent ?? 'A') as Cards
}

const getType = (cards: Cards, part2: boolean) =>
  TYPES.find(type => isType(type, part2 ? resolveJokers(cards) : cards))

// Break down the lines into a hand of cards and their bet, then resolve the
// type of each hand (considering jokers for part 2), sort them, and resolve
// their score based on the final order.
export const run = (input: string[], part2 = false) =>
  input
    .map(line => line.split(' ') as [Cards, number])
    .map(
      ([cards, bet]) => ({ cards, bet, type: getType(cards, part2) }) as Hand
    )
    .sort(sortHands(part2 ? 'AKQT98765432J' : 'AKQJT98765432'))
    .map((game, index, array) => game.bet * (array.length - index))
    .reduce((a, b) => a + b, 0)
