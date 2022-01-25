const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`.split('\n')

test('Day 6.1', t => {
  t.deepEqual(run(sample), ['advent', 'easter'])
})

test.skip('Day 6.2', t => {})

test('Day 6 — Solutions', t => {
  t.deepEqual(run(input), ['myregdnr', 'tzstqsua'])
})
