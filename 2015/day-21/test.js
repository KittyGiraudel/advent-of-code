const test = require('ava')
const { run } = require('./')

test.skip('Day 21 — Sample', t => {})

test('Day 21 — Solutions', t => {
  t.deepEqual(run([0, 9, 2, 103]), [121, 201])
})
