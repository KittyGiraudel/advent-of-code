import test from 'ava'
import $ from '../../helpers'

test.skip('Day 18 — Sample', t => {
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
})

test.skip('Day 18 — Solutions', t => {
  const input = $.readInput(import.meta)
})
