const test = require('ava')
const $ = require('../../helpers')
const { play } = require('./')

test('Day 11 — Sample', t => {
  const sample = $.sample(
    `
  Monkey 0:
    Starting items: 79, 98
    Operation: new = old * 19
    Test: divisible by 23
      If true: throw to monkey 2
      If false: throw to monkey 3

  Monkey 1:
    Starting items: 54, 65, 75, 74
    Operation: new = old + 6
    Test: divisible by 19
      If true: throw to monkey 2
      If false: throw to monkey 0

  Monkey 2:
    Starting items: 79, 60, 97
    Operation: new = old * old
    Test: divisible by 13
      If true: throw to monkey 1
      If false: throw to monkey 3

  Monkey 3:
    Starting items: 74
    Operation: new = old + 3
    Test: divisible by 17
      If true: throw to monkey 0
      If false: throw to monkey 1
  `,
    '\n\n'
  )

  t.is(play(sample), 10605)
  t.is(play(sample, true), 2713310158)
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(__dirname, '\n\n')

  t.is(play(input), 58056)
  t.is(play(input, true), 15048718170)
})
