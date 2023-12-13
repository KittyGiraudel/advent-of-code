import { Coords } from '../types'

export type Grid<T> = T[][]
type Mapper<I, O> = (value: I, ri: number, ci: number) => O
type Handler =
  | 'forEach'
  | 'filter'
  | 'map'
  | 'flatMap'
  | 'find'
  | 'every'
  | 'some'

const loopOnGrid =
  <T, U>(handler: Handler) =>
  (grid: Grid<T>, callback: (item: T, ri: number, ci: number) => U) =>
    (grid[handler].bind(grid) as CallableFunction)((row: T[], ri: number) =>
      (row[handler].bind(row) as CallableFunction)((item: T, ci: number) =>
        callback(item, ri, ci)
      )
    )

const gridForEach = <T>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => void
): void => loopOnGrid<T, void>('forEach')(grid, callback)

const gridMap = <T, U>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => U
): Grid<U> => loopOnGrid<T, U>('map')(grid, callback)

const gridFilter = <T>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => boolean
) => gridFlatMap(grid, callback).filter(Boolean)

const gridFlatMap = <T, U>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => U
): U[] => loopOnGrid<T, U>('flatMap')(grid, callback)

const gridEvery = <T>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => boolean
) => loopOnGrid<T, boolean>('every')(grid, callback)

const gridSome = <T>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => boolean
) => loopOnGrid<T, boolean>('some')(grid, callback)

const gridFind = <T>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => boolean
): T => loopOnGrid<T, boolean>('find')(grid, callback)

const gridReduce = <T, U>(
  grid: Grid<T>,
  callback: (acc: U, current: T, ci: number, ri: number) => U,
  initialValue: U
): U =>
  grid.reduce(
    (accRow, row, ri) =>
      row.reduce((accCol, item, ci) => callback(accCol, item, ri, ci), accRow),
    initialValue
  )

const gridFindCoords = <T>(
  grid: Grid<T>,
  callback: (item: T, ri: number, ci: number) => boolean
) =>
  gridReduce<T, Coords | null>(
    grid,
    (acc, item, ri, ci) => acc || (callback(item, ri, ci) ? [ri, ci] : acc),
    null
  )

const identity = <T>(value: string, ri: number, ci: number) => value as T
const gridFrom = <T>(
  rows: string[],
  mapper: Mapper<string, T> = identity
): Grid<T> =>
  rows.map((row, ri) => Array.from(row).map((item, ci) => mapper(item, ri, ci)))

const cloneGrid = <T>(grid: Grid<T>): Grid<T> =>
  grid.slice(0).map(row => row.slice(0))

const initGrid = <T>(
  width: number,
  height: number = width,
  value: T | null | ((ci: number, ri: number) => T) = null
): Grid<T> =>
  Array.from({ length: height }, (_, ri) =>
    Array.from({ length: width }, (_, ci) =>
      typeof value === 'function' ? (value as CallableFunction)(ri, ci) : value
    )
  )

const renderGrid = <T>(
  grid: Grid<T>,
  separator: string = '',
  mapper = (value: T) => String(value)
) =>
  gridMap(grid, mapper)
    .map(row => row.join(separator))
    .join('\n')

const gridRotate = <T>(grid: Grid<T>): Grid<T> =>
  Array.from(grid[0]).map((_, ci) => grid.map(row => row[ci]).reverse())

const gridVariants = <T>(grid: Grid<T>) => {
  const variants: Grid<T>[] = []
  const clone = cloneGrid(grid)

  const rotate = (grid: Grid<T>, rotations: number = 0) => {
    for (let i = 0; i < rotations; i++) grid = gridRotate(grid)
    return grid
  }

  for (let i = 0; i <= 3; i++) {
    const rotated = rotate(clone, i)
    const flipped = rotated.slice(0).reverse()
    variants.push(rotated)
    variants.push(flipped)
  }

  return variants
}

const gridAt = <T>(grid: Grid<T>, coords: Coords) =>
  grid?.[coords[0]]?.[coords[1]]

const gridSet = <T>(grid: Grid<T>, coords: Coords, value: T) => {
  grid[coords[0]][coords[1]] = value
  return grid
}

const gridWidth = (grid: Grid<any>) => grid[0].length
const gridHeight = (grid: Grid<any>) => grid.length
const gridDimensions = (grid: Grid<any>) => ({
  width: gridWidth(grid),
  height: gridHeight(grid),
})

export default {
  at: gridAt,
  clone: cloneGrid,
  dimensions: gridDimensions,
  every: gridEvery,
  filter: gridFilter,
  find: gridFind,
  findCoords: gridFindCoords,
  flatMap: gridFlatMap,
  forEach: gridForEach,
  from: gridFrom,
  height: gridHeight,
  init: initGrid,
  map: gridMap,
  reduce: gridReduce,
  render: renderGrid,
  rotate: gridRotate,
  set: gridSet,
  some: gridSome,
  variants: gridVariants,
  width: gridWidth,
}
