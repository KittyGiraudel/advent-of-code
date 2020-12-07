const test = require('ava')
const { getLooseCountForGroup, getStrictCountForGroup } = require('./')
const sum = require('../helpers/sum')
const groups = require('../helpers/readInput')(__dirname, '\n\n')

test('Day 6.1', t => {
  t.is(getLooseCountForGroup('abc'), 3)
  t.is(getLooseCountForGroup('a\nb\nc'), 3)
  t.is(getLooseCountForGroup('ab\nac'), 3)
  t.is(getLooseCountForGroup('a\na\na\na'), 1)
  t.is(getLooseCountForGroup('b'), 1)
})

test('Day 6.2', t => {
  t.is(getStrictCountForGroup('abc'), 3)
  t.is(getStrictCountForGroup('a\nb\nc'), 0)
  t.is(getStrictCountForGroup('ab\nac'), 1)
  t.is(getStrictCountForGroup('a\na\na\na'), 1)
  t.is(getStrictCountForGroup('b'), 1)
  t.is(getStrictCountForGroup('w\ns\nq\ns'), 0)
})

test('Day 6 — Solutions', t => {
  t.is(sum(groups.map(getLooseCountForGroup)), 6703)
  t.is(sum(groups.map(getStrictCountForGroup)), 3430)
})
