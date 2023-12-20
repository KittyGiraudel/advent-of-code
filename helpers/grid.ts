import { Coords, Point } from '../types'
import $ from './'

type Mapper<I, O> = (value: I, ri: number, ci: number) => O
const identity = <I, O>(value: I, ri: number, ci: number) =>
  value as unknown as O

class Grid<T> {
  private data: T[][]

  constructor(
    width: number,
    height: number = width,
    value: T | null | ((ci: number, ri: number) => T) = null
  ) {
    this.data = Array.from({ length: height }, (_, ri) =>
      Array.from({ length: width }, (_, ci) =>
        typeof value === 'function'
          ? (value as CallableFunction)(ri, ci)
          : value
      )
    )
  }

  get width() {
    return this.data[0].length
  }

  get height() {
    return this.data.length
  }

  get rows() {
    return this.data
  }

  get columns() {
    return $.range(this.width).map(index => this.column(index))
  }

  row(index: number) {
    return this.data.at(index) ?? []
  }

  column(index: number) {
    return $.column<T>(this.rows, index)
  }

  get(position: Point | Coords) {
    const coords =
      typeof position === 'string' ? $.toCoords(position) : position

    return this.data?.[coords[0]]?.[coords[1]]
  }

  set(position: Point | Coords, value: T) {
    const coords =
      typeof position === 'string' ? $.toCoords(position) : position

    this.data[coords[0]][coords[1]] = value

    return this
  }

  static from<I, O>(input: I[][], mapper: Mapper<I, O> = identity) {
    const width = input[0].length
    const height = input.length
    const grid = new Grid<O>(width, height)

    input.forEach((row, ri) => {
      Array.from(row).forEach((value, ci) => {
        grid.set([ri, ci], mapper(value, ri, ci))
      })
    })

    return grid
  }

  static fromRows<O>(input: string[], mapper: Mapper<string, O> = identity) {
    return Grid.from(
      input.map(row => Array.from(row)),
      mapper
    )
  }

  clone() {
    return new Grid<T>(this.width, this.height, (...coords) => this.get(coords))
  }

  forEach(handler: (item: T, ri: number, ci: number) => void) {
    this.rows.forEach((row, ri) =>
      row.forEach((value, ci) => handler(value, ri, ci))
    )
  }

  map<O extends T>(handler: (item: T, ri: number, ci: number) => O) {
    const next = this.clone() as Grid<O>

    this.forEach((value, ...coords) =>
      next.set(coords, handler(value, ...coords))
    )

    return next
  }

  flatMap<O>(handler: (item: T, ri: number, ci: number) => O): O[] {
    return this.rows.flatMap((row, ri) =>
      row.flatMap((value, ci) => handler(value, ri, ci))
    )
  }

  every(handler: (item: T, ri: number, ci: number) => boolean) {
    return this.rows.every((row, ri) =>
      row.every((value, ci) => handler(value, ri, ci))
    )
  }

  some(handler: (item: T, ri: number, ci: number) => boolean) {
    return this.rows.some((row, ri) =>
      row.some((value, ci) => handler(value, ri, ci))
    )
  }

  // @TODO: fix return type
  filter(handler: (item: T, ri: number, ci: number) => boolean) {
    return this.flatMap(handler).filter(Boolean)
  }

  // @TODO: fix return type
  find(handler: (item: T, ri: number, ci: number) => T) {
    return this.rows.find((row, ri) =>
      row.find((value, ci) => handler(value, ri, ci))
    )
  }

  reduce<O>(
    handler: (acc: O, item: T, ri: number, ci: number) => O,
    initialValue: O
  ) {
    return this.data.reduce(
      (accRow, row, ri) =>
        row.reduce((accCol, item, ci) => handler(accCol, item, ri, ci), accRow),
      initialValue
    )
  }

  findCoords(handler: (item: T, ri: number, ci: number) => boolean) {
    return this.reduce<Coords | null>(
      (acc, item, ri, ci) => acc || (handler(item, ri, ci) ? [ri, ci] : acc),
      null
    )
  }

  render(
    separator: string = '',
    mapper: (value: T) => string = value => String(value)
  ) {
    return this.rows.map(row => row.map(mapper).join(separator)).join('\n')
  }

  flat() {
    return this.rows.flat()
  }

  stringify() {
    return this.rows.map(row => row.join(',')).join('')
  }

  rotate(): Grid<T> {
    const next = new Grid<T>(0)

    this.rows[0].forEach((_, ci) => {
      next.rows.push(this.rows.map(row => row[ci]).reverse())
    })

    return next
  }

  variants() {
    const variants: Grid<T>[] = []

    const rotate = (rotations: number = 0) => {
      let grid = this.clone()
      for (let i = 0; i < rotations; i++) grid = grid.rotate()
      return grid
    }

    for (let i = 0; i <= 3; i++) {
      const rotated = rotate(i)
      const flipped = rotated.clone()
      flipped.rows.reverse()
      variants.push(rotated)
      variants.push(flipped)
    }

    return variants
  }
}

export default Grid
