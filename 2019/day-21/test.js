const test = require('ava')
const { run } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 21 — Sample', t => {})

test('Day 21 — Solutions', t => {
  t.is(run(input), 19351175)
})
