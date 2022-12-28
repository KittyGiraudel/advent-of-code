const test = require('ava')
const $ = require('../../helpers')
const { process, processGroups } = require('./')

test('Day 03 — Sample', t => {
  const sample = $.sample(`
  vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw
  `)

  t.is(process(sample), 157)
  t.is(processGroups(sample), 70)
})

test('Day 03 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(process(input), 8394)
  t.is(processGroups(input), 2413)
})
