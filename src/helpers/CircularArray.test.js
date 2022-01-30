const test = require('ava')
const CircularArray = require('./CircularArray')

test('CircularArray - Empty', t => {
  const a = new CircularArray()
  t.is(a.tail, null)
  t.is(a.head, null)
  t.is(a.size, 0)
})

test('CircularArray - Single node (push)', t => {
  const a = new CircularArray()
  a.push(0)
  t.is(a.tail, a.head)
  t.is(a.head.next, a.tail)
  t.is(a.tail.next, a.head)
  t.is(a.size, 1)
})

test('CircularArray - Single node (unshift)', t => {
  const a = new CircularArray()
  a.unshift(0)
  t.is(a.tail, a.head)
  t.is(a.head.next, a.tail)
  t.is(a.tail.next, a.head)
  t.is(a.size, 1)
})

test('CircularArray - Single node (init)', t => {
  const a = new CircularArray(0)
  t.is(a.tail, a.head)
  t.is(a.head.next, a.tail)
  t.is(a.tail.next, a.head)
  t.is(a.size, 1)
})

test('CircularArray - Single node (pop)', t => {
  const a = new CircularArray([0, 1])
  a.pop()
  t.is(a.tail, a.head)
  t.is(a.head.next, a.tail)
  t.is(a.tail.next, a.head)
  t.is(a.size, 1)
})

test('CircularArray - Single node (shift)', t => {
  const a = new CircularArray([1, 0])
  a.shift()
  t.is(a.tail, a.head)
  t.is(a.head.next, a.tail)
  t.is(a.tail.next, a.head)
  t.is(a.size, 1)
})
