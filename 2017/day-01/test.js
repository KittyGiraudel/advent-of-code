const test = require('ava')
const $ = require('../../helpers')
const { captcha } = require('./')

test('Day 01 — Sample', t => {
  t.is(captcha('1122', 1), 3)
  t.is(captcha('1111', 1), 4)
  t.is(captcha('1234', 1), 0)
  t.is(captcha('91212129', 1), 9)
  t.is(captcha('1212'), 6)
  t.is(captcha('1221'), 0)
  t.is(captcha('123425'), 4)
  t.is(captcha('123123'), 12)
  t.is(captcha('12131415'), 4)
})

test('Day 01 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(captcha(input, 1), 1253)
  t.is(captcha(input), 1278)
})
