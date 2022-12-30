import test from 'ava'
import { run } from './'
import $ from '../../helpers'

test('Day 06 — Sample', t => {
  const sample = $.sample(`
  eedadn
  drvtee
  eandsr
  raavrd
  atevrs
  tsrnev
  sdttsa
  rasrtv
  nssdts
  ntnada
  svetve
  tesnvt
  vntsnd
  vrdear
  dvrsen
  enarar
  `)

  t.deepEqual(run(sample), ['advent', 'easter'])
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.deepEqual(run(input), ['myregdnr', 'tzstqsua'])
})
