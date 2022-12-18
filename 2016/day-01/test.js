const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname, ', ')

test('Day 01 — Sample', t => {
  t.is(run('R2, L3'.split(', '))[0], 5)
  t.is(run('R2, R2, R2'.split(', '))[0], 2)
  t.is(run('R5, L5, R5, R3'.split(', '))[0], 12)
  t.is(run('R8, R4, R4, R8'.split(', '))[1], 4)
})

test('Day 01 — Solutions', t => {
  t.deepEqual(run(input), [239, 141])
})
