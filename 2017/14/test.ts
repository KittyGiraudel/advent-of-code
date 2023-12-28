import test from 'ava'
import { run } from './'

test('Day 14 — Sample', t => {
  t.is(run('flqrgnkx'), 8108)
  t.is(run('flqrgnkx', true), 1242)
})

test('Day 14 — Solutions', t => {
  t.is(run('vbqugkhl'), 8148)
  t.is(run('vbqugkhl', true), 1180)
})
