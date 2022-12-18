const test = require('ava')
const { boot } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 23 — Sample', t => {})

test('Day 23 — Solutions', t => {
  t.is(boot(input).pop(), 20160)
  t.is(boot(input).shift(), 13164)
})
