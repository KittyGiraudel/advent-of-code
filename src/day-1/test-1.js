const test = require('ava')
const { findMatches, getResult } = require('./')

test('Day 1.1', t => {
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 2), [1721, 299])
  t.is(getResult(2), 866436)
})

test('Day 1.2', t => {
  t.deepEqual(findMatches([1721, 979, 366, 299, 675, 1456], 3), [979, 366, 675])
  t.is(getResult(3), 276650720)
})
