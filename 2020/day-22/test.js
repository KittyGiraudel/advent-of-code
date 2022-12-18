const test = require('ava')
const { getGameScore, fightRecursive } = require('.')
const input = require('../../helpers/readInput')(__dirname, '\n\n')

const example = `
Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10
`
  .trim()
  .split('\n\n')

test('Day 22 — Sample', t => {
  t.is(getGameScore(example), 306)
  t.is(getGameScore(example, fightRecursive), 291)
})

test('Day 22 — Solutions', t => {
  t.is(getGameScore(input), 34664)
  t.is(getGameScore(input, fightRecursive), 32018)
})
