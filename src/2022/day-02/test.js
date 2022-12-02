const test = require('ava')
const { battleA, battleB } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `A Y
B X
C Z`.split('\n')

test('Day 2.1', t => {
  t.is(battleA(sample), 15)
})

test('Day 2.2', t => {
  t.is(battleB(sample), 12)
})

test('Day 2 — Solutions', t => {
  t.is(battleA(input), 13682)
  t.is(battleB(input), 12881)
})
