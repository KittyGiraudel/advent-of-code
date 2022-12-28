const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 15 — Sample', t => {
  const sample = $.sample(`
  Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
  Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
  `)

  t.is(run(sample), 62842880)
  t.is(run(sample, 500), 57600000)
})

test('Day 15 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 21367368)
  t.is(run(input, 500), 1766400)
})
