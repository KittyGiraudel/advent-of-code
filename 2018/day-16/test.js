const test = require('ava')
const { debug } = require('./')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

test.skip('Day 16 — Sample', t => {})

test('Day 16 — Solutions', t => {
  //t.is(debug(input), 588)
  t.is(debug(input)[0], 627)
})
