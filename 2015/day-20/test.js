const test = require('ava')
const { run } = require('./')

test('Day 20 — Sample', t => {
  t.deepEqual(run(150), [8, 8])
})

test('Day 20 — Solutions', t => {
  t.deepEqual(run(29_000_000), [665280, 705600])
})
