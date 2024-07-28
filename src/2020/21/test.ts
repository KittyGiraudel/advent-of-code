import assert from 'node:assert'
import test from 'node:test'
import { countAllergenFreeOccurrences, getCanonicalDangerousList } from '.'
import $ from '../../helpers'

test('Day 21 — Sample', () => {
  const example = $.sample(`
  mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
  trh fvjkl sbzzf mxmxvkd (contains dairy)
  sqjhc fvjkl (contains soy)
  sqjhc mxmxvkd sbzzf (contains fish)
  `)

  assert.strictEqual(countAllergenFreeOccurrences(example), 5)
  assert.strictEqual(getCanonicalDangerousList(example), 'mxmxvkd,sqjhc,fvjkl')
})

test('Day 21 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(countAllergenFreeOccurrences(input), 2280)
  assert.strictEqual(
    getCanonicalDangerousList(input),
    'vfvvnm,bvgm,rdksxt,xknb,hxntcz,bktzrz,srzqtccv,gbtmdb'
  )
})
