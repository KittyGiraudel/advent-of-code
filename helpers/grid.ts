import { Coords } from '../types'

export type Grid<T> = T[][]
type Mapper<T> = (value: string, ri: number, ci: number) => T
type Handler = 'forEach' | 'map' | 'flatMap' | 'find' | 'every' | 'some'

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
  gridReduce(
    grid,
    (acc, item, ri, ci) =>
      acc || (callback(item, ri, ci) ? ([ri, ci] as Coords) : acc),
    null as Coords | null
  )

const identity = ((value: string, ri: number, ci: number) =>
  value) as Mapper<string>

const createGrid = <T>(
  rows: string[],
  mapper: Mapper<T> = identity as Mapper<T>
) =>
  rows.map((row, ri) =>
    row.split('').map((item, ci) => mapper(item, ri, ci))
  ) as Grid<T>

const cloneGrid = <T>(grid: Grid<T>) =>
  grid.slice(0).map(row => row.slice(0)) as Grid<T>

function isCallable<T>(
  maybeFunc: T | ((ri: number, ci: number) => T)
): maybeFunc is (ri: number, ci: number) => T {
  return typeof maybeFunc === 'function'
}

const initGrid = <T>(
  width: number,
  height: number = width,
  value: T | null | ((ci: number, ri: number) => T) = null
) =>
  Array.from({ length: height }, (_, ri) =>
    Array.from({ length: width }, (_, ci) =>
      isCallable(value) ? value(ci, ri) : value
    )
  ) as Grid<T>

const gridRotate = <T>(grid: Grid<T>) =>
  Array.from(grid[0]).map((_, index) =>
    grid.map(row => row[index]).reverse()
  ) as Grid<T>

const renderGrid = <T>(
  grid: Grid<T>,
  separator: string = '',
  mapper = (value: T) => String(value)
) =>
  gridMap(grid, mapper)
    .map(row => row.join(separator))
    .join('\n')

const gridVariants = <T>(grid: Grid<T>) => {
  const variants = []
  const clone = cloneGrid(grid)

  const rotate = (grid: Grid<T>, rotations: number = 0) => {
    for (let i = 0; i < rotations; i++) grid = gridRotate(grid)
    return grid
  }

  for (let i = 0; i <= 3; i++) {
    const matrix = rotate(clone, i)
    variants.push(matrix)
    variants.push(matrix.slice(0).reverse())
  }

  return variants
}

export default {
  forEach: gridForEach,
  map: gridMap,
  flatMap: gridFlatMap,
  find: gridFind,
  findCoords: gridFindCoords,
  every: gridEvery,
  some: gridSome,
  rotate: gridRotate,
  reduce: gridReduce,
  create: createGrid,
  clone: cloneGrid,
  init: initGrid,
  render: renderGrid,
  variants: gridVariants,
}
