const test = require('ava')
const { getEpsilonAndGamma, getOxygen, getCO2 } = require('./')
const items = require('../../helpers/readInput')(__dirname)

const sample = `00100
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
01010`.split('\n')

test('Day 3.1', t => {
  const { gamma, epsilon } = getEpsilonAndGamma(sample)
  const power = parseInt(gamma, 2) * parseInt(epsilon, 2)

  t.is(gamma, '10110')
  t.is(epsilon, '01001')
  t.is(power, 198)
})

test('Day 3.2', t => {
  const oxygen = getOxygen(sample)
  const CO2 = getCO2(sample)
  const life = parseInt(oxygen, 2) * parseInt(CO2, 2)

  t.is(oxygen, '10111')
  t.is(CO2, '01010')
  t.is(life, 230)
})

test('Day 3 — Solutions', t => {
  const { gamma, epsilon } = getEpsilonAndGamma(items)
  const power = parseInt(gamma, 2) * parseInt(epsilon, 2)
  t.is(power, 4103154)

  const oxygen = getOxygen(items)
  const CO2 = getCO2(items)
  const life = parseInt(oxygen, 2) * parseInt(CO2, 2)
  t.is(life, 4245351)
})
