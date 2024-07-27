import test from 'ava'
import $ from '../../helpers'
import { resolve, run } from './'

test('Day 24 — Sample', t => {
  const sampleA = $.sample(`
  inp x
  mul x -1
  `)

  const sampleB = $.sample(`
  inp z
  inp x
  mul z 3
  eql z x
  `)

  t.is(run(sampleA, [7]).x, -7)
  t.is(run(sampleB, [3, 8]).z, 0)
  t.is(run(sampleB, [3, 9]).z, 1)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(resolve(input, true), 53_999_995_829_399)
  t.is(resolve(input, false), 11_721_151_118_175)
})
