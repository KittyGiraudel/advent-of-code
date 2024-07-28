import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { play } from './'

test('Day 11 — Sample', () => {
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
    { delimiter: '\n\n' }
  )

  assert.strictEqual(play(sample), 106_05)
  assert.strictEqual(play(sample, true), 2_713_310_158)
})

test('Day 11 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(play(input), 58_056)
  assert.strictEqual(play(input, true), 15_048_718_170)
})
