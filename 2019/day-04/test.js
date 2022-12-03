const test = require('ava')
const { isValidPassword, findPasswords } = require('./')
const input = `272091-815432`

test('Day 4.1', t => {
  t.truthy(isValidPassword('111111'))
  t.falsy(isValidPassword('223450'))
  t.falsy(isValidPassword('123789'))
})

test('Day 4.2', t => {
  t.truthy(isValidPassword('111122', true))
  t.truthy(isValidPassword('112222', true))
  t.truthy(isValidPassword('112233', true))
  t.falsy(isValidPassword('123789', true))
})

test('Day 4 — Solutions', t => {
  t.is(findPasswords(input).length, 931)
  t.is(findPasswords(input, true).length, 609)
})
