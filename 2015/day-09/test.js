const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`.split('\n')

test('Day 09 — Sample', t => {
  t.is(Math.min(...run(sample)), 605)
  t.is(Math.max(...run(sample)), 982)
})

test('Day 09 — Solutions', t => {
  t.is(Math.min(...run(input)), 207)
  t.is(Math.max(...run(input)), 804)
})
