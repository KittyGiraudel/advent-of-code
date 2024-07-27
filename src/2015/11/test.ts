import test from 'ava'
import { isValid, run } from './'

test('Day 11 — Sample', t => {
  t.is(isValid('hijklmmn'), false)
  t.is(isValid('abbceffg'), false)
  t.is(isValid('abcdffaa'), true)
  t.is(isValid('ghjaabcc'), true)
  t.is(run('ghijklmn'), 'ghjaabcc')
})

test('Day 11 — Solutions', t => {
  t.is(run('vzbxkghb'), 'vzbxxyzz')
  t.is(run('vzbxxyzz'), 'vzcaabcc')
})
