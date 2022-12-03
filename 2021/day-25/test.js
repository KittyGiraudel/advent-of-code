const test = require('ava')
const $ = require('../../helpers')
const { run, steps, serialize } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `...>...
.......
......>
v.....>
......>
.......
..vvv..`.split('\n')

const sampleB = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`.split('\n')

test('Day 25.1', t => {
  t.is(
    serialize(steps(sampleA, 4)),
    `>......
..v....
..>.v..
.>.v...
...>...
.......
v......`
  )
  t.is(
    serialize(steps(sampleB, 5)),
    `vv>...>v>.
v.v.v>.>v.
>.v.>.>.>v
>v>.>..v>>
..v>v.v...
..>.>>vvv.
.>...v>v..
..v.v>>v.v
v.v.>...v.`
  )

  t.is(
    serialize(steps(sampleB, 10)),
    `..>..>>vv.
v.....>>.v
..v.v>>>v>
v>.>v.>>>.
..v>v.vv.v
.v.>>>.v..
v.v..>v>..
..v...>v.>
.vv..v>vv.`
  )

  t.is(
    serialize(steps(sampleB, 58)),
    `..>>v>vv..
..v.>>vv..
..>>v>>vv.
..>>>>>vv.
v......>vv
v>v....>>v
vvv.....>>
>vv......>
.>v.vv.v..`
  )

  t.is(run(sampleB), 58)
})

test.skip('Day 25.2', t => {})

test('Day 25 — Solutions', t => {
  t.is(run(input), 417)
})
