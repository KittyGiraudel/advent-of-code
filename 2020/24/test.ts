import test from 'ava'
import { gameOfLife } from '.'
import $ from '../../helpers'

test('Day 24 — Sample', t => {
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

  t.is(gameOfLife(example, 0), 10)
  t.is(gameOfLife(example, 1), 15)
  t.is(gameOfLife(example, 2), 12)
  t.is(gameOfLife(example, 10), 37)
  t.is(gameOfLife(example, 100), 2208)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(gameOfLife(input, 0), 488)
  t.is(gameOfLife(input, 100), 4118)
})
