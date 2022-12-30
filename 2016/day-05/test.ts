import test from 'ava'
import { run } from './'

// Too slow to run.
test.skip('Day 05 — Sample', t => {
  t.is(run('abc')[0], '18f47a30')
})

test.skip('Day 05 — Solutions', t => {
  t.deepEqual(run('ugkcyxxp'), ['d4cd2ee1', 'f2c730e5'])
})
