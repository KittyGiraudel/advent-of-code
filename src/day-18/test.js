const test = require('ava')
const { computeLoose, computeStrict } = require('.')
const sum = require('../helpers/sum')
const input = require('../helpers/readInput')(__dirname)

test('Day 18.1', t => {
  t.is(computeLoose('1 + (2 * 3) + (4 * (5 + 6))'), 51)
  t.is(computeLoose('2 * 3 + (4 * 5)'), 26)
  t.is(computeLoose('5 + (8 * 3 + 9 + 3 * 4 * 3)'), 437)
  t.is(computeLoose('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'), 12240)
  t.is(computeLoose('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'), 13632)
})

test('Day 18.2', t => {
  t.is(computeStrict('1 + (2 * 3) + (4 * (5 + 6))'), 51)
  t.is(computeStrict('2 * 3 + (4 * 5)'), 46)
  t.is(computeStrict('5 + (8 * 3 + 9 + 3 * 4 * 3)'), 1445)
  t.is(computeStrict('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'), 669060)
  t.is(computeStrict('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'), 23340)
})

test('Day 18 — Solutions', t => {
  t.is(sum(input.map(computeLoose)), 280014646144)
  t.is(sum(input.map(computeStrict)), 9966990988262)
})
