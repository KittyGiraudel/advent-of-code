const test = require('ava')
const $ = require('../../helpers')
const { checksum, findId } = require('./')

test('Day 02 — Sample', t => {
  t.is(
    checksum([
      'abcdef',
      'bababc',
      'abbcde',
      'abcccd',
      'aabcdd',
      'abcdee',
      'ababab',
    ]),
    12
  )
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(checksum(input), 6916)
  t.is(findId(input), 'oeylbtcxjqnzhgyylfapviusr')
})
