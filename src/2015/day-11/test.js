const test = require('ava')
const { run, isValid } = require('./')

test('Day 11.1', t => {
  t.is(isValid('hijklmmn'), false)
  t.is(isValid('abbceffg'), false)
  t.is(isValid('abcdffaa'), true)
  t.is(isValid('ghjaabcc'), true)
  t.is(run('ghijklmn'), 'ghjaabcc')
})

test.skip('Day 11.2', t => {})

test('Day 11 — Solutions', t => {
  t.is(run('vzbxkghb'), 'vzbxxyzz')
  t.is(run('vzbxxyzz'), 'vzcaabcc')
})
