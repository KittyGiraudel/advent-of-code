import test from 'ava'
import { run } from './'

test('Day 04 — Sample', t => {
  t.is(run('abcdef'), 609043)
})

test('Day 04 — Solutions', t => {
  t.is(run('ckczppom'), 117946)
  t.is(run('ckczppom', 6), 3938038)
})
