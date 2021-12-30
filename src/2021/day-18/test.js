const test = require('ava')
const { parseLine, reduce, sumFish, computeMagnitude } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`.split('\n')

const sampleB = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.split('\n')

test.skip('Day 18.1a', t => {
  const sample = parseLine('[[[[[9,8],1],2],3],4]')
  const actual = JSON.stringify(reduce(sample))
  t.is(actual, '[[[[0,9],2],3],4]')
})

test.skip('Day 18.1b', t => {
  const sample = parseLine('[7,[6,[5,[4,[3,2]]]]]')
  const actual = JSON.stringify(reduce(sample))
  t.is(actual, '[7,[6,[5,[7,0]]]]')
})

test.skip('Day 18.1c', t => {
  const sample = parseLine('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')
  const actual = JSON.stringify(reduce(sample))
  t.is(actual, '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')
})

test.skip('Day 18.1d', t => {
  const sample = parseLine('[[6,[5,[4,[3,2]]]],1]')
  const actual = JSON.stringify(reduce(sample))
  t.is(actual, '[[6,[5,[7,0]]],3]')
})

test.skip('Day 18.1e', t => {
  const sample = parseLine('[[[[[[1,1],[2,2]],[3,3]],[4,4]],[5,5]],[6,6]]')
  const actual = JSON.stringify(reduce(sample))
  t.is(actual, '[[[[5,0],[7,4]],[5,5]],[6,6]]')
})

test.skip('Day 18.1f', t => {
  const sample = parseLine(
    `[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]`
  )
  const actual = JSON.stringify(reduce(sample))
  const expected = '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]'

  t.is(actual, expected)
})

test.skip('Day 18 — Magnitude', t => {
  t.is(computeMagnitude(JSON.parse('[9,1]')), 29)
  t.is(computeMagnitude(JSON.parse('[1,9]')), 21)
  t.is(computeMagnitude(JSON.parse('[[1,2],[[3,4],5]]')), 143)
  t.is(computeMagnitude(JSON.parse('[[9,1],[1,9]]')), 129)
  t.is(computeMagnitude(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')), 1384)
})

test.skip('Day 18.1', t => {
  t.is(
    JSON.stringify(
      sumFish([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ])
    ),
    '[[[[1,1],[2,2]],[3,3]],[4,4]]'
  )
  t.is(
    JSON.stringify(
      sumFish([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
      ])
    ),
    '[[[[3,0],[5,3]],[4,4]],[5,5]]'
  )
  t.is(
    JSON.stringify(
      sumFish([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
      ])
    ),
    '[[[[5,0],[7,4]],[5,5]],[6,6]]'
  )
  t.is(
    JSON.stringify(
      sumFish(
        JSON.parse(
          `[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]`
        )
      )
    ),
    '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]'
  )
})

test.skip('Day 18.2', t => {})

test.skip('Day 18 — Solutions', t => {})
