import test from 'ava'
import { run } from './'

test('Day 17 — Sample', t => {
  t.is(run('ihgpwlah'), 'DDRRRD')
  t.is(run('kglvqrro'), 'DDUDRLRRUDRD')
  t.is(run('ulqzkmiv'), 'DRURDRUDDLLDLUURRDULRLDUUDDDRR')
  t.is(run('ihgpwlah', true).length, 370)
  t.is(run('kglvqrro', true).length, 492)
  t.is(run('ulqzkmiv', true).length, 830)
})

test('Day 17 — Solutions', t => {
  t.is(run('awrkjxxr'), 'RDURRDDLRD')
  t.is(run('awrkjxxr', true).length, 526)
})
