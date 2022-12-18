const test = require('ava')
const { checksum, findId } = require('./')
const input = require('../../helpers/readInput')(__dirname)

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
  t.is(checksum(input), 6916)
  t.is(findId(input), 'oeylbtcxjqnzhgyylfapviusr')
})
