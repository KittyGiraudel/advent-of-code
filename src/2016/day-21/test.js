const test = require('ava')
const { run, run2 } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`.split('\n')

test('Day 21.1', t => {
  t.is(run(sample, 'abcde'), 'decab')
})

test.skip('Day 21.2', t => {})

test('Day 21 — Solutions', t => {
  t.is(run(input, 'abcdefgh'), 'gfdhebac')
  t.is(run2(input), 'dhaegfbc')
})
