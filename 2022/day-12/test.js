const test = require('ava')
const { process, findShortestPath } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`.split('\n')

test('Day 12 — Sample', t => {
  t.is(process(sample), 31)
  t.is(findShortestPath(sample), 29)
})

test('Day 12 — Solutions', t => {
  t.is(process(input), 484)
  t.is(findShortestPath(input), 478)
})
