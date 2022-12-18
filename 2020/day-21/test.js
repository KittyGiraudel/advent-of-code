const test = require('ava')
const { countAllergenFreeOccurrences, getCanonicalDangerousList } = require('.')
const input = require('../../helpers/readInput')(__dirname)

const example = `
mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)
`
  .trim()
  .split('\n')

test('Day 21 — Sample', t => {
  t.is(countAllergenFreeOccurrences(example), 5)
  t.is(getCanonicalDangerousList(example), 'mxmxvkd,sqjhc,fvjkl')
})

test('Day 21 — Solutions', t => {
  t.is(countAllergenFreeOccurrences(input), 2280)
  t.is(
    getCanonicalDangerousList(input),
    'vfvvnm,bvgm,rdksxt,xknb,hxntcz,bktzrz,srzqtccv,gbtmdb'
  )
})
