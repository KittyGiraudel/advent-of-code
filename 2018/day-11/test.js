const test = require('ava')
const { getFuelStrict, getFuelLoose } = require('./')

test('Day 11.1', t => {
  t.deepEqual(getFuelStrict(18), { coords: [33, 45], value: 29 })
  t.deepEqual(getFuelStrict(42), { coords: [21, 61], value: 30 })
})

test('Day 11.2', t => {
  t.deepEqual(getFuelLoose(18), { coords: [90, 269, 16], value: 113 })
})

test('Day 11 — Solutions', t => {
  t.deepEqual(getFuelStrict(8561), { coords: [21, 37], value: 30 })
  t.deepEqual(getFuelLoose(8561), { coords: [236, 146, 12], value: 160 })
})
