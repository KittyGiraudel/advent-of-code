type Deck = number[]
type Outcome = { index: number; decks: Deck[] }

const isNotEmpty = (deck: Deck): boolean => deck.length > 0

const draw = (decks: Deck[]): number[] => decks.map(deck => deck.shift())

const getWinningIndex = (cards: number[]): number =>
  cards.findIndex(card => card === Math.max(...cards))

const serializeGame = (decks: Deck[]): string =>
  decks.map(deck => deck.join(',')).join(';')

// Compute the score of a given deck.
// @param cards - Cards from the deck
const computeScore = (cards: Deck): number =>
  cards.reduceRight(
    (total, card, index, array) => total + card * (array.length - index),
    0
  )

// Parse the given input.
// @param input - Raw input
const parseInput = (input: string[]): Deck[] =>
  input.map(stack => stack.split('\n').slice(1).map(Number))

// Perform a regular fight between decks a and b.
// @param decks - Decks of cards
// @return Outcome with `index` (0 or 1) and `decks` (final decks)
export const fightRegular = (decks: Deck[]): Outcome => {
  while (decks.every(isNotEmpty)) {
    const cards = draw(decks)
    const index = getWinningIndex(cards)
    decks[index].push(cards[index], cards[+!index])
  }

  return { index: decks.findIndex(isNotEmpty), decks }
}

// Perform a recursive fight between deck a and b.
// @param decks - Decks of cards
// @return Outcome with `index` (0 or 1) and `decks` (final decks)
export const fightRecursive = (
  decks: Deck[],
  cache: Set<string> = new Set()
): Outcome => {
  while (decks.every(isNotEmpty)) {
    const key = serializeGame(decks)

    if (cache.has(key)) return { index: 0, decks }
    else cache.add(key)

    const cards = draw(decks)
    const index = decks.every((deck, i) => deck.length >= cards[i])
      ? fightRecursive(decks.map((deck, i) => deck.slice(0, cards[i]) as Deck))
          .index
      : getWinningIndex(cards)

    decks[index].push(cards[index], cards[+!index])
  }

  return { index: decks.findIndex(isNotEmpty), decks }
}

// Return the game score by computing the score of the winning deck.
// @param input - Raw input
// @param resolver - Either `fightRegular` or `fightRecursive`
export const getGameScore = (
  input: string[],
  resolver: Function = fightRegular
): number => {
  const decks = parseInput(input)
  const outcome = resolver(decks)

  return computeScore(outcome.decks[outcome.index])
}
