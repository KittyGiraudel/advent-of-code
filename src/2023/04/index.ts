import $ from '../../helpers'

const parseCard = (line: string) => {
  const sets = line.split(':')[1].split('|').map($.numbers)
  const score = $.intersection(...sets).length

  return { score, count: 1 }
}

export const run = (input: string[], part2 = false) => {
  const cards = input.map(parseCard)

  if (part2) {
    // Iterate through the deck sequentially. For each card, iterate as many
    // times as it had winning numbers, and increase the amount of copies of the
    // subsequent cards in the deck. For instance, if cards (plural intended) #4
    // have 3 winning numbers (a score of 3), increase the count of card #5, #6,
    // and #7 by the amount of cards #4 we own.
    for (let i = 0; i < cards.length; i++)
      for (let j = 1; j <= cards[i].score; j++)
        cards[i + j].count += cards[i].count
  }

  const scores = part2
    ? cards.map(card => card.count)
    : cards.map(card => (card.score ? 2 ** (card.score - 1) : 0))

  return $.sum(scores)
}
