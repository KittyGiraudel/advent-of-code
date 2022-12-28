const test = require('ava')
const { run } = require('./')

test('Day 21 — Solutions', t => {
  t.deepEqual(run([0, 9, 2, 103]), [121, 201])
})
