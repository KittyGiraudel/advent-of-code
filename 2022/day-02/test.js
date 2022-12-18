const test = require('ava')
const { battleA, battleB } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `A Y
B X
C Z`.split('\n')

test('Day 02 — Sample', t => {
  t.is(battleA(sample), 15)
  t.is(battleB(sample), 12)
})

test('Day 02 — Solutions', t => {
  t.is(battleA(input), 13682)
  t.is(battleB(input), 12881)
})
