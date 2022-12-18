const test = require('ava')
const { navigateLoose, navigateStrict } = require('.')
const input = require('../../helpers/readInput')(__dirname)

test('Day 12 — Sample', t => {
  t.is(navigateLoose('F10,N3,F7,R90,F11'.split(',')), 25)
  t.is(navigateStrict('F10,N3,F7,R90,F11'.split(',')), 286)
})

test('Day 12 — Solutions', t => {
  t.is(navigateLoose(input), 1631)
  t.is(navigateStrict(input), 58606)
})
