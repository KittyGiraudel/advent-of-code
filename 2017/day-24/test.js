const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`.split('\n')

const outputA = run(sampleA)
const sortByScore = (a, b) => b.score - a.score
const sortByLength = (a, b) => b.length - a.length || sortByScore(a, b)
const getBest = bridges => bridges[0].score

test('Day 24 — Sample', t => {
  t.is(getBest(outputA.sort(sortByScore)), 31)
  t.is(getBest(outputA.sort(sortByLength)), 19)
})

test('Day 24 — Solutions', t => {
  const bridges = run(input)

  t.is(getBest(bridges.sort(sortByScore)), 2006)
  t.is(getBest(bridges.sort(sortByLength)), 1994)
})
