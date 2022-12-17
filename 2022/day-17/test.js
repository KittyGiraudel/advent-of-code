const test = require('ava')
const { tetris } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

test('Day 17.1', t => {
  t.is(tetris(sample), 3068)
})

test.skip('Day 17.2', t => {})

test('Day 17 — Solutions', t => {
  t.is(tetris(input), 3224)
})
