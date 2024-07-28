import assert from 'node:assert'
import test from 'node:test'
import { gameOfLife } from '.'
import $ from '../../helpers'

test('Day 24 — Sample', () => {
  const example = $.sample(`
  sesenwnenenewseeswwswswwnenewsewsw
  neeenesenwnwwswnenewnwwsewnenwseswesw
  seswneswswsenwwnwse
  nwnwneseeswswnenewneswwnewseswneseene
  swweswneswnenwsewnwneneseenw
  eesenwseswswnenwswnwnwsewwnwsene
  sewnenenenesenwsewnenwwwse
  wenwwweseeeweswwwnwwe
  wsweesenenewnwwnwsenewsenwwsesesenwne
  neeswseenwwswnwswswnw
  nenwswwsewswnenenewsenwsenwnesesenew
  enewnwewneswsewnwswenweswnenwsenwsw
  sweneswneswneneenwnewenewwneswswnese
  swwesenesewenwneswnwwneseswwne
  enesenwswwswneneswsenwnewswseenwsese
  wnwnesenesenenwwnenwsewesewsesesew
  nenewswnwewswnenesenwnesewesw
  eneswnwswnwsenenwnwnwwseeswneewsenese
  neswnwewnwnwseenwseesewsenwsweewe
  wseweeenwnesenwwwswnew
  `)

  assert.strictEqual(gameOfLife(example, 0), 10)
  assert.strictEqual(gameOfLife(example, 1), 15)
  assert.strictEqual(gameOfLife(example, 2), 12)
  assert.strictEqual(gameOfLife(example, 10), 37)
  assert.strictEqual(gameOfLife(example, 100), 2208)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(gameOfLife(input, 0), 488)
  assert.strictEqual(gameOfLife(input, 100), 4118)
})
