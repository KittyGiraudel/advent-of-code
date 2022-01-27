const isNotEmpty = deck => deck.length > 0
const draw = decks => decks.map(deck => deck.shift())
const getWinningIndex = cards =>
  cards.findIndex(card => card === Math.max(...cards))
const serializeGame = decks => decks.map(deck => deck.join(',')).join(';')

// Compute the score of a given deck.
// @param {Number[]} cards - Cards from the deck
// @return {Number}
const computeScore = cards =>
  cards.reduceRight(
    (total, card, index, array) => total + card * (array.length - index),
    0
  )

// Parse the given input.
// @param {String[]} input - Raw input
// @return {Number[][]}
const parseInput = input =>
  input.map(stack => stack.split('\n').slice(1).map(Number))

// Perform a regular fight between decks a and b.
// @param {Number[]} a - Deck A
// @param {Number[]} b - Deck B
// @return {Object} Outcome with `index` (0 or 1) and `decks` (final decks)
const fightRegular = decks => {
  while (decks.every(isNotEmpty)) {
    const cards = draw(decks)
    const index = getWinningIndex(cards)
    decks[index].push(cards[index], cards[+!index])
  }

  return { index: decks.findIndex(isNotEmpty), decks }
}

// Perform a recursive fight between deck a and b.
// @param {Number[]} a - Deck A
// @param {Number[]} b - Deck B
// @return {Object} Outcome with `index` (0 or 1) and `decks` (final decks)
const fightRecursive = (decks, cache = new Set()) => {
  while (decks.every(isNotEmpty)) {
    const key = serializeGame(decks)

    if (cache.has(key)) return { index: 0, decks }
    else cache.add(key)

    const cards = draw(decks)
    const index = decks.every((deck, i) => deck.length >= cards[i])
      ? fightRecursive(decks.map((deck, i) => deck.slice(0, cards[i]))).index
      : getWinningIndex(cards)

    decks[index].push(cards[index], cards[+!index])
  }

  return { index: decks.findIndex(isNotEmpty), decks }
}

// Return the game score by computing the score of the winning deck.
// @param {String[]} input - Raw input
// @param {Function} resolver - Either `fightRegular` or `fightRecursive`
// @param {Number}
const getGameScore = (input, resolver = fightRegular) => {
  const decks = parseInput(input)
  const outcome = resolver(decks)

  return computeScore(outcome.decks[outcome.index])
}

module.exports = { fightRecursive, fightRegular, getGameScore }
