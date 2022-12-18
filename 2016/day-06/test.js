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

test('Day 06 — Sample', t => {
  t.deepEqual(run(sample), ['advent', 'easter'])
})

test('Day 06 — Solutions', t => {
  t.deepEqual(run(input), ['myregdnr', 'tzstqsua'])
})
