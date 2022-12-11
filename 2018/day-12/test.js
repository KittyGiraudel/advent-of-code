const test = require('ava')
const { cycle } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

const sample = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`.split('\n\n')

test('Day 12.1', t => {
  t.is(cycle(sample, 20), 325)
})

test.skip('Day 12.2', t => {})

test('Day 12 — Solutions', t => {
  t.is(cycle(input, 20), 3217)
  t.is(cycle(input, 50000000000), 4000000000866)
})