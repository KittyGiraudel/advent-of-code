const test = require('ava')
const $ = require('../../helpers')
const { decode, encode } = require('./')

test('Day 08 — Sample', t => {
  const sample = $.sample(
    require('fs').readFileSync(__dirname + '/sample.txt', 'utf8')
  )

  t.is(decode(sample), 12)
  t.is(encode(sample), 19)
})

test('Day 08 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(decode(input), 1350)
  t.is(encode(input), 2085)
})
