const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test('Day 5.1', t => {
  t.is(run(['ugknbfddgicrmopn']), 1)
  t.is(run(['aaa']), 1)
  t.is(run(['jchzalrnumimnmhp']), 0)
  t.is(run(['haegwjzuvuyypxyu']), 0)
  t.is(run(['dvszwmarrgswjxmb']), 0)
})

test('Day 5.2', t => {
  t.is(run(['qjhvhtzxzqqjkmpb'], true), 1)
  t.is(run(['xxyxx'], true), 1)
  t.is(run(['uurcxstgmygtbstg'], true), 0)
  t.is(run(['ieodomkazucvgmuy'], true), 0)
})

test('Day 5 — Solutions', t => {
  t.is(run(input), 255)
  t.is(run(input, true), 55)
})
