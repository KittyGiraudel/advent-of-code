import test from 'ava'
import $ from '../../helpers'
import { run } from './'

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

  t.is(run(sample), 'advent')
  t.is(run(sample, true), 'easter')
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 'myregdnr')
  t.is(run(input, true), 'tzstqsua')
})
