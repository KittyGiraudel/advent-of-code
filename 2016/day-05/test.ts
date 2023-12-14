import test from 'ava'
import { run } from './'

// Too slow to run.
test.skip('Day 05 — Sample', t => {
  t.is(run('abc'), '18f47a30')
})

test.skip('Day 05 — Solutions', t => {
  t.is(run('ugkcyxxp'), 'd4cd2ee1')
  t.is(run('ugkcyxxp', true), 'f2c730e5')
})
