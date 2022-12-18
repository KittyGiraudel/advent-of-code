const test = require('ava')
const { run } = require('./')

test('Day 10 — Sample', t => {
  t.is(run('1'), 2)
  t.is(run('11'), 2)
  t.is(run('21'), 4)
  t.is(run('1211'), 6)
  t.is(run('111221'), 6)
})

test('Day 10 — Solutions', t => {
  t.is(run('1113122113', 40), 360154)
  t.is(run('1113122113', 50), 5103798)
})
