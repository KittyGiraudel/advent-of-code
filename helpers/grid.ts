import { Coords } from '../types'

export type Grid<Type> = Type[][]
type Mapper<T> = (value: string, ri: number, ci: number) => T
type Handler = 'forEach' | 'map' | 'flatMap' | 'find' | 'every' | 'some'

const loopOnGrid =
  <Input, Output>(handler: Handler) =>
  (
    grid: Grid<Input>,
    callback: (item: Input, ri: number, ci: number) => Output
  ) =>
    (grid[handler].bind(grid) as CallableFunction)((row: Input[], ri: number) =>
      (row[handler].bind(row) as CallableFunction)((item: Input, ci: number) =>
        callback(item, ri, ci)
      )
    )

const gridForEach = <Input>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => void
): void => loopOnGrid<Input, void>('forEach')(grid, callback)

const gridMap = <Input, Output>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => Output
): Grid<Output> => loopOnGrid<Input, Output>('map')(grid, callback)

const gridFlatMap = <Input, Output>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => Output
): Output[] => loopOnGrid<Input, Output>('flatMap')(grid, callback)

const gridEvery = <Input>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => boolean
): boolean => loopOnGrid<Input, boolean>('every')(grid, callback)

const gridSome = <Input>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => boolean
): boolean => loopOnGrid<Input, boolean>('some')(grid, callback)

const gridFind = <Input>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => boolean
): Input => loopOnGrid<Input, boolean>('find')(grid, callback)

const gridFindCoords = <Input>(
  grid: Grid<Input>,
  callback: (item: Input, ri: number, ci: number) => boolean
): Coords =>
  (grid.find.bind(grid) as CallableFunction)((row: Input[], ri: number) =>
    (row.find.bind(row) as CallableFunction)((item: Input, ci: number) =>
      callback(item, ri, ci) ? ([ri, ci] as Coords) : false
    )
  )

const gridReduce = <Input, Output>(
  grid: Grid<Input>,
  callback: (acc: Output, current: Input, ci: number, ri: number) => Output,
  initialValue: Output
): Output =>
  grid.reduce(
    (accRow, row, ri) =>
      row.reduce((accCol, item, ci) => callback(accCol, item, ri, ci), accRow),
    initialValue
  )

const identity: Mapper<string> = (value: string, ri: number, ci: number) =>
  value

const createGrid = <Input>(
  rows: string[],
  mapper: Mapper<Input> = identity as Mapper<Input>
): Grid<Input> =>
  rows.map((row, ri) => row.split('').map((item, ci) => mapper(item, ri, ci)))

const cloneGrid = <Input>(grid: Grid<Input>): Grid<Input> =>
  grid.slice(0).map(row => row.slice(0))

function isCallable<Type>(
  maybeFunc: Type | ((ri: number, ci: number) => Type)
): maybeFunc is (ri: number, ci: number) => Type {
  return typeof maybeFunc === 'function'
}

const initGrid = <Input>(
  width: number,
  height: number = width,
  value: Input | ((ci: number, ri: number) => Input) = null
): Grid<Input> =>
  Array.from({ length: height }, (_, ri) =>
    Array.from({ length: width }, (_, ci) =>
      isCallable(value) ? value(ci, ri) : value
    )
  )

const gridRotate = <Input>(grid: Grid<Input>): Grid<Input> =>
  Array.from(grid[0]).map((_, index) => grid.map(row => row[index]).reverse())

const renderGrid = <Input>(
  grid: Grid<Input>,
  separator: string = '',
  mapper = (value: Input): string => String(value)
): string =>
  gridMap(grid, mapper)
    .map(row => row.join(separator))
    .join('\n')

const gridVariants = <Input>(grid: Grid<Input>): Grid<Input>[] => {
  const variants = []
  const clone = cloneGrid(grid)

  const rotate = (grid: Grid<Input>, rotations: number = 0): Grid<Input> => {
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
