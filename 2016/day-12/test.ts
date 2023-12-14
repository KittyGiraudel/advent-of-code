import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', t => {
  const sample = $.sample(`
  cpy 41 a
  inc a
  inc a
  dec a
  jnz a 2
  dec a
  `)

  t.is(run(sample), 42)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 0), 317_993)
  t.is(run(input, 1), 9_227_647)
})
