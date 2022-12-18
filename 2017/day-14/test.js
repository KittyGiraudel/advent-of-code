const test = require('ava')
const { run } = require('./')

test('Day 14 — Sample', t => {
  t.deepEqual(run('flqrgnkx'), [8108, 1242])
})

test('Day 14 — Solutions', t => {
  t.deepEqual(run('vbqugkhl'), [8148, 1180])
})
