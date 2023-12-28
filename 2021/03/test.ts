import test from 'ava'
import $ from '../../helpers'
import { getEpsilonAndGamma, getOxygen, getCO2 } from './'

test('Day 03 — Sample', t => {
  const sample = $.sample(`
  00100
  11110
  10110
  10111
  10101
  01111
  00111
  11100
  10000
  11001
  00010
  01010
  `)

  const { gamma, epsilon } = getEpsilonAndGamma(sample)
  const power = parseInt(gamma, 2) * parseInt(epsilon, 2)

  t.is(gamma, '10110')
  t.is(epsilon, '01001')
  t.is(power, 198)

  const oxygen = getOxygen(sample)
  const CO2 = getCO2(sample)
  const life = parseInt(oxygen, 2) * parseInt(CO2, 2)

  t.is(oxygen, '10111')
  t.is(CO2, '01010')
  t.is(life, 230)
})

test('Day 03 — Solutions', t => {
  const input = $.readInput(import.meta)

  const { gamma, epsilon } = getEpsilonAndGamma(input)
  const power = parseInt(gamma, 2) * parseInt(epsilon, 2)
  t.is(power, 4_103_154)

  const oxygen = getOxygen(input)
  const CO2 = getCO2(input)
  const life = parseInt(oxygen, 2) * parseInt(CO2, 2)
  t.is(life, 4_245_351)
})
