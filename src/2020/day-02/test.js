const test = require('ava')
const { isValidLoose, isValidStrict } = require('./')
const policies = require('../../helpers/readInput')(__dirname)

test('Day 2.1', t => {
  t.is(isValidLoose('1-3 a: abcde'), true)
  t.is(isValidLoose('1-3 b: cdefg'), false)
  t.is(isValidLoose('2-9 c: ccccccccc'), true)
})

test('Day 2.2', t => {
  t.is(isValidStrict('1-3 a: abcde'), true)
  t.is(isValidStrict('1-3 b: cdefg'), false)
  t.is(isValidStrict('2-9 c: ccccccccc'), false)
})

test('Day 2 — Solutions', t => {
  t.is(policies.filter(isValidLoose).length, 500)
  t.is(policies.filter(isValidStrict).length, 313)
})
