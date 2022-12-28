const test = require('ava')
const $ = require('../../helpers')
const { battleA, battleB } = require('./')

test('Day 02 — Sample', t => {
  const sample = $.sample(`
  A Y
  B X
  C Z
  `)

  t.is(battleA(sample), 15)
  t.is(battleB(sample), 12)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(battleA(input), 13682)
  t.is(battleB(input), 12881)
})
