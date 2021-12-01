const test = require('ava')
const { gameOfLife } = require('.')
const input = require('../../helpers/readInput')(__dirname)

const example = `
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
`
  .trim()
  .split('\n')

test('Day 24.1', t => {
  t.is(gameOfLife(example, 0), 10)
})

test('Day 24.2', t => {
  t.is(gameOfLife(example, 1), 15)
  t.is(gameOfLife(example, 2), 12)
  t.is(gameOfLife(example, 10), 37)
  t.is(gameOfLife(example, 100), 2208)
})

test('Day 24 — Solutions', t => {
  t.is(gameOfLife(input, 0), 488)
  t.is(gameOfLife(input, 100), 4118)
})
