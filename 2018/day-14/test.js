const test = require('ava')
const { cook1, cook2 } = require('./')

test('Day 14 — Sample', t => {
  t.is(cook1(9), '5158916779')
  t.is(cook1(5), '0124515891')
  t.is(cook1(18), '9251071085')
  t.is(cook1(2018), '5941429882')
  t.is(cook2('51589'), 9)
  t.is(cook2('01245'), 5)
  t.is(cook2('92510'), 18)
  t.is(cook2('59414'), 2018)
})

test('Day 14 — Solutions', t => {
  t.is(cook1(260321), '9276422810')
  t.is(cook2('260321', 16_000_000), 20319117)
})
