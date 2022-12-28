const test = require('ava')
const $ = require('../../helpers')
const { boot } = require('./')

test('Day 23 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(boot(input).pop(), 20160)
  t.is(boot(input).shift(), 13164)
})
