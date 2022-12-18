const test = require('ava')
const { findPaths } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split('\n')

const sampleB = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.split('\n')

const sampleC = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split('\n')

test('Day 12 — Sample', t => {
  t.is(findPaths(sampleA).length, 10)
  t.is(findPaths(sampleB).length, 19)
  t.is(findPaths(sampleA, true).length, 36)
  t.is(findPaths(sampleB, true).length, 103)
  t.is(findPaths(sampleC, true).length, 3509)
})

test('Day 12 — Solutions', t => {
  t.is(findPaths(input).length, 4775)
  t.is(findPaths(input, true).length, 152480)
})
