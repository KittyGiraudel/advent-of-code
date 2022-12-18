const test = require('ava')
const { run } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 03 — Sample', t => {
  t.is(run('^v^v^v^v^v'), 2)
  t.is(run('^v^v^v^v^v', true), 11)
})

test('Day 01 — Solutions', t => {
  t.is(run(input), 2565)
  t.is(run(input, true), 2639)
})
