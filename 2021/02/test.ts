import test from 'ava'
import $ from '../../helpers'
import { proceed, proceedWithAim } from './'

test('Day 02 — Sample', t => {
  const sample = $.sample(`
  forward 5
  down 5
  forward 8
  up 3
  down 8
  forward 2
  `)

  const example = proceed(sample)
  t.is(example.depth * example.position, 150)

  const example2 = proceedWithAim(sample)
  t.is(example2.depth * example2.position, 900)
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  const data = proceed(input)
  t.is(data.depth * data.position, 1_488_669)

  const dataWithAim = proceedWithAim(input)
  t.is(dataWithAim.depth * dataWithAim.position, 1_176_514_794)
})
