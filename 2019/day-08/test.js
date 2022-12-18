const test = require('ava')
const { validate, recompose, render } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = '0222112222120000'

test.skip('Day 8 — Sample', t => {
  t.deepEqual(recompose(sample, { width: 2, height: 2 }), [
    [0, 1],
    [1, 0],
  ])
})

test('Day 08 — Solutions', t => {
  const dimensions = { width: 25, height: 6 }
  t.is(validate(input, dimensions), 2440)
  // console.log(render(recompose(input, dimensions)))
})
