const test = require('ava')
const { tetris } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

test('Day 17 — Sample', t => {
  t.is(tetris(sample), 3068)
})

test('Day 17 — Solutions', t => {
  t.is(tetris(input), 3224)
})
