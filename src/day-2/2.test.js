const test = require('ava')
const { isValidPassword1, isValidPassword2, getResult } = require('.')

test('Day 2.1', t => {
  t.is(isValidPassword1('1-3 a: abcde'), true)
  t.is(isValidPassword1('1-3 b: cdefg'), false)
  t.is(isValidPassword1('2-9 c: ccccccccc'), true)
  t.is(getResult(isValidPassword1), 500)
})

test('Day 2.2', t => {
  t.is(isValidPassword2('1-3 a: abcde'), true)
  t.is(isValidPassword2('1-3 b: cdefg'), false)
  t.is(isValidPassword2('2-9 c: ccccccccc'), false)
  t.is(getResult(isValidPassword2), 313)
})
