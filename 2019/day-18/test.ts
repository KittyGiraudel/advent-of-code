import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', t => {
  const sampleA = $.sample(`
  #########
  #b.A.@.a#
  #########
  `)

  const sampleB = $.sample(`
  ########################
  #f.D.E.e.C.b.A.@.a.B.c.#
  ######################.#
  #d.....................#
  ########################
  `)

  t.is(run(sampleA), 8)
  //t.is(run(sampleB), 86)
})

test.skip('Day 18 — Solutions', t => {
  const input = $.readInput(import.meta)
})
