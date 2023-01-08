import test from 'ava'
import $ from '../../helpers'
import { maze } from './'

const sample = $.sample(
  `
         A
         A
  #######.#########  
  #######.........#
  #######.#######.#
  #######.#######.#
  #######.#######.#
  #####  B    ###.#
BC...##  C    ###.#
  ##.##       ###.#
  ##...DE  F  ###.#
  #####    G  ###.#
  #########.#####.#
DE..#######...###.#
  #.#########.###.#
FG..#########.....#
  ###########.#####
             Z
             Z
`,
  { trim: false, deindent: false }
).slice(1, -1)

test('Day 20 — Sample', t => {
  t.is(maze(sample), 23)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(import.meta, { trim: false }).slice(0, -1)
  t.is(maze(input), 432)
})
