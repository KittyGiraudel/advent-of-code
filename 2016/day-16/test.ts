import test from 'ava'
import { run } from './'

test('Day 16 — Sample', t => {
  t.is(run('10000', 20), '01100')
})

test('Day 16 — Solutions', t => {
  t.is(run('01111010110010011', 272), '00100111000101111')
  t.is(run('01111010110010011', 35_651_584), '11101110011100110')
})
