import test from 'ava'
import $ from '../../helpers'
import { steps, findRepeat } from './'

test('Day 12 — Sample', t => {
  const sampleA = $.sample(`
  <x=-8, y=-10, z=0>
  <x=5, y=5, z=10>
  <x=2, y=-7, z=3>
  <x=9, y=-8, z=-3>
  `)

  const sampleB = $.sample(`
  <x=-1, y=0, z=2>
  <x=2, y=-10, z=-7>
  <x=4, y=-8, z=8>
  <x=3, y=5, z=-1>
  `)

  t.is(steps(sampleA, 100), 1940)
  t.is(findRepeat(sampleB), 2772)
  t.is(findRepeat(sampleA), 4686774924)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(steps(input, 1000), 6849)
  t.is(findRepeat(input), 356658899375688)
})
