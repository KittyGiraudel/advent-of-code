const test = require('ava')
const { validate, validateStrict } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test('Day 04 — Sample', t => {
  t.is(validate('aa bb cc dd ee'), true)
  t.is(validate('aa bb cc dd aa'), false)
  t.is(validate('aa bb cc dd aaa'), true)
  t.is(validateStrict('abcde fghij'), true)
  t.is(validateStrict('abcde xyz ecdab'), false)
  t.is(validateStrict('a ab abc abd abf abj'), true)
  t.is(validateStrict('iiii oiii ooii oooi oooo'), true)
  t.is(validateStrict('oiii ioii iioi iiio'), false)
})

test('Day 04 — Solutions', t => {
  t.is(input.filter(validate).length, 383)
  t.is(input.filter(validateStrict).length, 265)
})
