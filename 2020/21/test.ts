import test from 'ava'
import { countAllergenFreeOccurrences, getCanonicalDangerousList } from '.'
import $ from '../../helpers'

test('Day 21 — Sample', t => {
  const example = $.sample(`
  mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
  trh fvjkl sbzzf mxmxvkd (contains dairy)
  sqjhc fvjkl (contains soy)
  sqjhc mxmxvkd sbzzf (contains fish)
  `)

  t.is(countAllergenFreeOccurrences(example), 5)
  t.is(getCanonicalDangerousList(example), 'mxmxvkd,sqjhc,fvjkl')
})

test('Day 21 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(countAllergenFreeOccurrences(input), 2280)
  t.is(
    getCanonicalDangerousList(input),
    'vfvvnm,bvgm,rdksxt,xknb,hxntcz,bktzrz,srzqtccv,gbtmdb'
  )
})
