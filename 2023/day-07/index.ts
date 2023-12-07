import $ from '../../helpers'

type Cards = `${string},${string},${string},${string},${string}`
type Hand = { cards: Cards; bet: number; type: string }

const isPattern = (pattern: string) => (cards: Cards) =>
  Object.values($.frequency(cards))
    .sort((a, b) => b - a)
    .join('') === pattern

const TYPES = [
  { name: 'FIVE_OF_A_KIND', check: isPattern('5') },
  { name: 'FOUR_OF_A_KIND', check: isPattern('41') },
  { name: 'FULL_HOUSE', check: isPattern('32') },
  { name: 'THREE_OF_A_KIND', check: isPattern('311') },
  { name: 'TWO_PAIRS', check: isPattern('221') },
  { name: 'ONE_PAIR', check: isPattern('2111') },
  { name: 'HIGH_CARD', check: isPattern('11111') },
]

const getCardOrder = (advanced: boolean) =>
  advanced ? 'AKQT98765432J' : 'AKQJT98765432'

const getHandType = (cards: Cards) =>
  TYPES.find(type => type.check(cards))!.name

const resolveJokers = (cards: Cards) => {
  if (!cards.includes('J')) return cards

  const counters = $.frequency(cards)
  const otherCards = Object.keys(counters).filter(key => key !== 'J')
  const [highest] = otherCards.sort(compareCards(getCardOrder(true)))
  const [most] = otherCards.sort((a, b) => counters[b] - counters[a])

  switch (getHandType(cards)) {
    case 'FIVE_OF_A_KIND':
      return 'AAAAA' as Cards
    case 'FOUR_OF_A_KIND':
    case 'FULL_HOUSE':
      return highest.repeat(5) as Cards
    case 'THREE_OF_A_KIND':
    case 'ONE_PAIR':
      return cards.replace(/J/g, counters.J === 1 ? most : highest) as Cards
    default:
      return cards.replace(/J/g, counters.J === 1 ? highest : most) as Cards
  }
}

const compareCards = (order: string) => (cardA: string, cardB: string) =>
  order.indexOf(cardA) - order.indexOf(cardB)

const compareSimilarHands = (a: Cards, b: Cards, advanced: boolean) => {
  for (let i = 0; i < a.length; i++) {
    const order = getCardOrder(advanced)
    const comparison = compareCards(order)(a[i], b[i])
    if (comparison) return comparison
  }
  return 0
}

const sortHands = (advanced: boolean) => (a: Hand, b: Hand) => {
  const TYPE_NAMES = TYPES.map(type => type.name)

  return (
    TYPE_NAMES.indexOf(a.type) - TYPE_NAMES.indexOf(b.type) ||
    compareSimilarHands(a.cards, b.cards, advanced)
  )
}

const createHand =
  (advanced: boolean) =>
  ([cards, bet]: [Cards, number]) =>
    ({
      cards,
      bet,
      type: getHandType(advanced ? resolveJokers(cards) : cards),
    } as Hand)

export const run = (input: string[], advanced: boolean = false) => {
  // Break down the lines into a hand of cards and their bet, then resolve the
  // type of each hand (considering jokers for part 2), sort them, and resolve
  // their score based on the final order.
  const scores = input
    .map(line => line.split(' ') as [Cards, number])
    .map(createHand(advanced))
    .sort(sortHands(advanced))
    .map((game, index, array) => game.bet * (array.length - index))

  return $.sum(scores)
}
