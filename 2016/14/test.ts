import test from 'ava'
import { run } from './'

test('Day 14 — Sample', t => {
  t.is(run('abc'), 22_728)
})

test('Day 14 — Solutions', t => {
  t.is(run('jlmsuwbz'), 35_186)
})
