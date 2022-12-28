const test = require('ava')
const $ = require('../../helpers')
const { getLooseCountForGroup, getStrictCountForGroup } = require('./')

test('Day 06 — Sample', t => {
  t.is(getLooseCountForGroup('abc'), 3)
  t.is(getLooseCountForGroup('a\nb\nc'), 3)
  t.is(getLooseCountForGroup('ab\nac'), 3)
  t.is(getLooseCountForGroup('a\na\na\na'), 1)
  t.is(getLooseCountForGroup('b'), 1)
  t.is(getStrictCountForGroup('abc'), 3)
  t.is(getStrictCountForGroup('a\nb\nc'), 0)
  t.is(getStrictCountForGroup('ab\nac'), 1)
  t.is(getStrictCountForGroup('a\na\na\na'), 1)
  t.is(getStrictCountForGroup('b'), 1)
  t.is(getStrictCountForGroup('w\ns\nq\ns'), 0)
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(__dirname, '\n\n')

  t.is($.sum(input.map(getLooseCountForGroup)), 6703)
  t.is($.sum(input.map(getStrictCountForGroup)), 3430)
})
