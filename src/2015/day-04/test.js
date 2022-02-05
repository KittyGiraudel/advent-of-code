const test = require('ava')
const { run } = require('./')

test('Day 4.1', t => {
  t.is(run('abcdef'), 609043)
})

test.skip('Day 4.2', t => {})

test('Day 4 — Solutions', t => {
  t.is(run('ckczppom'), 117946)
  t.is(run('ckczppom', 6), 3938038)
})
