import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test.skip('Day 18 — Sample', () => {
  const sampleA = $.sample(`
  set a 1
  add a 2
  mul a a
  mod a 5
  snd a
  set a 0
  rcv a
  jgz a -1
  set a 1
  jgz a -2
  `)

  const sampleB = $.sample(`
  snd 1
  snd 2
  snd p
  rcv a
  rcv b
  rcv c
  rcv d
  `)

  assert.strictEqual(run(sampleA), 4)
  assert.strictEqual(run(sampleB), 3)
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 5969)
})
