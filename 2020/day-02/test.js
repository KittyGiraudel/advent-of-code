const test = require('ava')
const $ = require('../../helpers')
const { isValidLoose, isValidStrict } = require('./')

test('Day 02 — Sample', t => {
  t.is(isValidLoose('1-3 a: abcde'), true)
  t.is(isValidLoose('1-3 b: cdefg'), false)
  t.is(isValidLoose('2-9 c: ccccccccc'), true)
  t.is(isValidStrict('1-3 a: abcde'), true)
  t.is(isValidStrict('1-3 b: cdefg'), false)
  t.is(isValidStrict('2-9 c: ccccccccc'), false)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(input.filter(isValidLoose).length, 500)
  t.is(input.filter(isValidStrict).length, 313)
})
