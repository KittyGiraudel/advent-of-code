const test = require('ava')
const { process, processGroups } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split('\n')

test('Day 03 — Sample', t => {
  t.is(process(sample), 157)
  t.is(processGroups(sample), 70)
})

test('Day 03 — Solutions', t => {
  t.is(process(input), 8394)
  t.is(processGroups(input), 2413)
})
