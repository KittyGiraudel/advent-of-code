import $ from '../../helpers'

const BUG = '#'
const EMPTY = '.'

const getNext = (curr: string, count: number) => {
  if (curr === BUG) {
    return count === 1 ? BUG : EMPTY
  } else {
    return count === 1 || count === 2 ? BUG : EMPTY
  }
}

export const cycle = (curr: string) => {
  let next = ''
  const width = Math.sqrt(curr.length)

  for (let i = 0; i < curr.length; i++) {
    const bugs = [
      i - width,
      i % width === width - 1 ? null : i + 1,
      i + width,
      i % width === 0 ? null : i - 1,
    ].filter(i => curr?.[i as number] === BUG)
    next += getNext(curr[i], bugs.length)
  }

  return next
}

export const findBiodiversity = (input: string[]) => {
  const history: string[] = []
  let curr = input.join('')

  while (!history.includes(curr)) {
    history.push(curr)
    curr = cycle(curr)
  }

  return $.sum(
    curr
      .split('')
      .map((v, i) => (v === BUG ? i : null))
      .filter((value): value is number => typeof value === 'number')
      .map(i => 2 ** i)
  )
}

const CL = 0 // Current layer
const OL = -1 // Outer layer
const IL = +1 // Inner layer

//     |     |              |     |
//  0  |  1  |      2       |  3  |  4
//     |     |              |     |
// ----+-----+--------------+-----+-----
//     |     |              |     |
//  5  |  6  |      7       |  8  |  9
//     |     |              |     |
// ----+-----+--------------+-----+-----
//     |     | 0| 1| 2| 3| 4|     |
//     |     |--+--+--+--+--|     |
//     |     | 5| 6| 7| 8| 9|     |
//     |     |--+--+--+--+--|     |
// 10  | 11  |10|11|12|13|14|  13 |  14
//     |     |--+--+--+--+--|     |
//     |     |15|16|17|18|19|     |
//     |     |--+--+--+--+--|     |
//     |     |20|21|22|23|24|     |
// ----+-----+--------------+-----+-----
//     |     |              |     |
// 15  | 16  |      17      |  18 |  19
//     |     |              |     |
// ----+-----+--------------+-----+-----
//     |     |              |     |
// 20  | 21  |      22      |  23 |  24
//     |     |              |     |
//
// Map shamelessly stolen from: https://github.com/bhosale-ajay/adventofcode/blob/master/2019/ts/D24.test.ts
// prettier-ignore
const ERIS_MAP = [
  [
    [7, OL],
    [11, OL],
    [5, CL],
    [1, CL],
  ], // 0
  [
    [7, OL],
    [0, CL],
    [6, CL],
    [2, CL],
  ], // 1
  [
    [7, OL],
    [1, CL],
    [7, CL],
    [3, CL],
  ], // 2
  [
    [7, OL],
    [2, CL],
    [8, CL],
    [4, CL],
  ], // 3
  [
    [7, OL],
    [3, CL],
    [9, CL],
    [13, OL],
  ], // 4
  [
    [0, CL],
    [11, OL],
    [10, CL],
    [6, CL],
  ], // 5
  [
    [1, CL],
    [5, CL],
    [11, CL],
    [7, CL],
  ], // 6
  [
    [2, CL],
    [6, CL],
    [0, IL],
    [1, IL],
    [2, IL],
    [3, IL],
    [4, IL],
    [8, CL],
  ], // 7
  [
    [3, CL],
    [7, CL],
    [13, CL],
    [9, CL],
  ], // 8
  [
    [4, CL],
    [8, CL],
    [14, CL],
    [13, OL],
  ], // 9
  [
    [5, CL],
    [11, OL],
    [15, CL],
    [11, CL],
  ], // 10
  [
    [6, CL],
    [10, CL],
    [16, CL],
    [0, IL],
    [5, IL],
    [10, IL],
    [15, IL],
    [20, IL],
  ], // 11
  [], // 12
  [
    [8, CL],
    [4, IL],
    [9, IL],
    [14, IL],
    [19, IL],
    [24, IL],
    [18, CL],
    [14, CL],
  ], // 13
  [
    [9, CL],
    [13, CL],
    [19, CL],
    [13, OL],
  ], // 14
  [
    [10, CL],
    [11, OL],
    [20, CL],
    [16, CL],
  ], // 15
  [
    [11, CL],
    [15, CL],
    [21, CL],
    [17, CL],
  ], // 16
  [
    [20, IL],
    [21, IL],
    [22, IL],
    [23, IL],
    [24, IL],
    [16, CL],
    [22, CL],
    [18, CL],
  ], // 17
  [
    [13, CL],
    [17, CL],
    [23, CL],
    [19, CL],
  ], // 18
  [
    [14, CL],
    [18, CL],
    [24, CL],
    [13, OL],
  ], // 19
  [
    [15, CL],
    [11, OL],
    [17, OL],
    [21, CL],
  ], // 20
  [
    [16, CL],
    [20, CL],
    [17, OL],
    [22, CL],
  ], // 21
  [
    [17, CL],
    [21, CL],
    [17, OL],
    [23, CL],
  ], // 22
  [
    [18, CL],
    [22, CL],
    [17, OL],
    [24, CL],
  ], // 23
  [
    [19, CL],
    [23, CL],
    [17, OL],
    [13, OL],
  ], // 24
]

export const findRecursiveBiodiversity = (input: string[], count: number) => {
  let curr = input.join('')
  const width = curr.length

  while (count--) {
    const layers = [
      EMPTY.repeat(width),
      ...$.chunk(curr, width),
      EMPTY.repeat(width),
    ]
    curr = ''

    layers.forEach((layer, layerIndex) => {
      Array.from(layer).forEach((cell, ci) => {
        const bugs = ERIS_MAP[ci].filter(
          ([nci, layerDiff]) => layers[layerIndex + layerDiff]?.[nci] === BUG
        )
        curr += getNext(cell, bugs.length)
      })
    })
  }

  return $.countInString(curr, BUG)
}
