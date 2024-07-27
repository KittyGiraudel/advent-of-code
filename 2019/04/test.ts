import test from 'ava'
import { findPasswords, isValidPassword } from './'

test('Day 04 — Sample', t => {
  t.truthy(isValidPassword('111111'))
  t.falsy(isValidPassword('223450'))
  t.falsy(isValidPassword('123789'))
  t.truthy(isValidPassword('111122', true))
  t.truthy(isValidPassword('112222', true))
  t.truthy(isValidPassword('112233', true))
  t.falsy(isValidPassword('123789', true))
})

test('Day 04 — Solutions', t => {
  const input = '272091-815432'

  t.is(findPasswords(input).length, 931)
  t.is(findPasswords(input, true).length, 609)
})
