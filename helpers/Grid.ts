import type { Coords, Point } from '../types'
import $ from './'

type Mapper<I, O> = (value: I, coords: Coords) => O
const identity = <I, O>(value: I) => value as unknown as O

class Grid<T> {
  private data: T[][]

  /**
   * Instantiate a grid of the given dimensions, and fill it with the given
   * static value if any, or by applying the given mapper to each cell, or null
   * otherwise.
   */
  constructor(
    width: number,
    height: number = width,
    value: T | null | ((coords: Coords) => T) = null
  ) {
    this.data = Array.from({ length: height }, (_, ri) =>
      Array.from({ length: width }, (_, ci) =>
        typeof value === 'function'
          ? (value as CallableFunction)([ri, ci])
          : value
      )
    )
  }

  /**
   * Instantiate a grid from the given bi-dimensional array, applying the mapper
   * function if given.
   * @example $.Grid.from<string, number>([['0', '1'], ['1', '2']], Number)
   */
  static from<I, O = I>(input: I[][], mapper: Mapper<I, O> = identity) {
    return new Grid<O>(input[0].length, input.length, ([ri, ci]) =>
      mapper(input[ri][ci], [ri, ci])
    )
  }

  /**
   * Instantiate a grid from the given flat array of strings, applying the
   * mapper function if given.
   * Note: This mainly exists for typing convenience, as most puzzle inputs are
   * parsed in the form of a flat array of strings.
   * @example $.Grid.fromRows<number>(['01', '12'], Number)
   */
  static fromRows<O = string>(
    input: string[],
    mapper: Mapper<string, O> = identity
  ) {
    return Grid.from(
      input.map(row => Array.from(row)),
      mapper
    )
  }

  /**
   * Return the width of the grid (by checking the length of the first row).
   */
  get width() {
    return this.data.length ? this.data[0].length : 0
  }

  /**
   * Return the height of the grid (by check the amount of rows).
   */
  get height() {
    return this.data.length
  }

  /**
   * Return the grid rows.
   * Note: Mutating these will mutate the grid data.
   */
  get rows() {
    return this.data
  }

  /**
   * Return the grid columns.
   * Note: Mutating these will *not* mutate the grid data.
   */
  get columns() {
    return Array.from({ length: this.width }, (_, ci) =>
      this.rows.map(row => row.at(ci) as T)
    )
  }

  /**
   * Return the row at the given index.
   * Note: Mutating this array will mutate the grid data.
   */
  row(index: number) {
    return this.data.at(index) ?? []
  }

  /**
   * Return the column at the given index.
   * Note: Mutating this array will *not* mutate the grid data.
   */
  column(index: number) {
    return $.column<T>(this.rows, index)
  }

  /**
   * Return the value stored at the given position (either as a point or as a
   * pair of Y,X coordinates), or undefined otherwise.
   * @example grid.get('0,0')
   * @example grid.get([0, 0])
   */
  get(position: Point | Coords) {
    const coords =
      typeof position === 'string' ? $.toCoords(position) : position

    return this.data?.[coords[0]]?.[coords[1]]
  }

  /**
   * Return the value stored at the given position (either as a point or as a
   * pair of Y,X coordinates), or undefined otherwise.
   * Note: This is an alias of `Grid.prototype.get`.
   */
  at(position: Point | Coords) {
    return this.get(position)
  }

  /**
   * Set the given value at the given position (either as a point or as a pair
   * of Y,X coordinates), or throw if out of bound.
   */
  set(position: Point | Coords, value: T) {
    const [ri, ci] =
      typeof position === 'string' ? $.toCoords(position) : position

    if (!$.isClamped(ri, 0, this.height - 1)) {
      throw new Error(
        `Cannot set value at position ${position} since row ${ri} is out of bound for grid of height ${this.height}.`
      )
    }

    if (!$.isClamped(ci, 0, this.width - 1)) {
      throw new Error(
        `Cannot set value at position ${position} since column ${ci} is out of bound for grid of width ${this.width}.`
      )
    }

    this.data[ri][ci] = value

    return this
  }

  /**
   * Append a new row to the grid.
   */
  appendRow(row: T[]) {
    if (this.width && row.length !== this.width) {
      throw new Error(
        `Cannot append row of length ${row.length} for grid of width ${this.width}.`
      )
    }

    this.data.push(row)
  }

  /**
   * Prepend a new row to the grid.
   */
  prependRow(row: T[]) {
    if (this.width && row.length !== this.width) {
      throw new Error(
        `Cannot prepend row of length ${row.length} for grid of width ${this.width}.`
      )
    }

    this.data.unshift(row)
  }

  /**
   * Append a new column to the grid.
   */
  appendColumn(column: T[]) {
    if (this.height && column.length !== this.height) {
      throw new Error(
        `Cannot append column of length ${column.length} for grid of height ${this.height}.`
      )
    }

    this.rows.forEach((row, ri) => row.push(column[ri]))
  }

  /**
   * Prepend a new column to the grid.
   */
  prependColumn(column: T[]) {
    if (this.height && column.length !== this.height) {
      throw new Error(
        `Cannot prepend column of length ${column.length} for grid of height ${this.height}.`
      )
    }

    this.rows.forEach((row, ri) => row.unshift(column[ri]))
  }

  /**
   * Return a new grid instance.
   */
  clone() {
    return Grid.from(structuredClone(this.data))
  }

  /**
   * Iterate over the grid from top-to-bottom and left-to-right, applying the
   * given handler for each entry.
   */
  forEach(handler: (item: T, coords: Coords) => void) {
    this.rows.forEach((row, ri) =>
      row.forEach((value, ci) => handler(value, [ri, ci]))
    )
  }

  /**
   * Iterate over the grid from top-to-bottom and left-to-right, returning the
   * result of the given handler for each entry.
   */
  map<O>(handler: (item: T, coords: Coords) => O) {
    const next = Grid.from(this.data) as Grid<O>

    this.forEach((value, coords) => next.set(coords, handler(value, coords)))

    return next
  }

  /**
   * Iterate over the grid from top-to-bottom and left-to-right, returning the
   * result of the given handler for each entry, and flattening the result into
   * a single flat array.
   */
  flatMap<O>(handler: (item: T, coords: Coords) => O) {
    return this.rows.flatMap((row, ri) =>
      row.flatMap((value, ci) => handler(value, [ri, ci]))
    )
  }

  /**
   * Iterate over the grid from top-to-bottom and left-to-right, returning true
   * if every entry matches the given predicate, or false otherwise.
   */
  every(predicate: (item: T, coords: Coords) => boolean) {
    return this.rows.every((row, ri) =>
      row.every((value, ci) => predicate(value, [ri, ci]))
    )
  }

  /**
   * Iterate over the grid from top-to-bottom and left-to-right, returning true
   * if some entry matches the given predicate, or false otherwise.
   */
  some(predicate: (item: T, coords: Coords) => boolean) {
    return this.rows.some((row, ri) =>
      row.some((value, ci) => predicate(value, [ri, ci]))
    )
  }

  /**
   * Iterate over the grid from top-to-bottom, returning true if some row
   * matches the given predicate, or false otherwise.
   */
  someRow(predicate: (row: T[], ri: number) => boolean) {
    return this.rows.some(predicate)
  }

  /**
   * Iterate over the grid from left-to-right, returning true if some column
   * matches the given predicate, or false otherwise.
   */
  someColumn(predicate: (column: T[], ri: number) => boolean) {
    return this.columns.some(predicate)
  }

  /**
   * Iterate over the grid from top-to-bottom and left-to-right, returning as a
   * flat array only the entries that match the given predicate.
   */
  filter(predicate: (item: T, coords: Coords) => boolean) {
    return this.rows
      .map((row, ri) => row.filter((value, ci) => predicate(value, [ri, ci])))
      .filter(row => row.length > 0)
      .flat()
  }

  /**
   * Count the number of entries that match the given predicate.
   */
  count(predicate: (item: T, coords: Coords) => boolean) {
    return this.filter(predicate).length
  }

  /**
   * Find the first set of Y,X coordinates where the entry matches the given
   * predicate, or undefined otherwise.
   */
  findCoords(predicate: (item: T, coords: Coords) => boolean) {
    return this.reduce<Coords | undefined>(
      (acc, item, coords) => acc ?? (predicate(item, coords) ? coords : acc),
      undefined
    )
  }

  /**
   * Find the first entry that matches the given predicate, or undefined
   * otherwise.
   */
  find(predicate: (item: T, coords: Coords) => boolean) {
    const coords = this.findCoords(predicate)

    return coords ? this.get(coords) : undefined
  }

  /**
   * Reduce the grid data into a single value starting from the given initial
   * value (and its associated type).
   */
  reduce<O>(handler: (acc: O, item: T, coords: Coords) => O, initialValue: O) {
    return this.data.reduce(
      (accRow, row, ri) =>
        row.reduce(
          (accCol, item, ci) => handler(accCol, item, [ri, ci]),
          accRow
        ),
      initialValue
    )
  }

  /**
   * Return a flat version of the grid by concatenating all its rows together.
   */
  flat() {
    return this.rows.flat()
  }

  /**
   * Return a 2D representation of the grid data by joining its rows with line
   * breaks and its columns with the given separator (or an empty string
   * otherwise).
   */
  render(
    separator = '',
    mapper: (value: T) => string = value => String(value)
  ) {
    return this.rows.map(row => row.map(mapper).join(separator)).join('\n')
  }

  /**
   * Return a new grid made by rotating the current grid 90° clockwise.
   */
  rotate() {
    const next = new Grid<T>(0)

    this.columns.forEach((_, ci) => {
      next.rows.push(this.rows.map(row => row[ci]).reverse())
    })

    return next
  }

  /**
   * Return a new grid made by flipping the current grid horizontally (i.e.
   * reversing the order of rows).
   */
  flip() {
    const flipped = this.clone()
    flipped.rows.reverse()
    return flipped
  }

  /**
   * Return the 8 variants of the grid (4 rotations * 2 orientations).
   */
  variants() {
    const variants: Grid<T>[] = []

    const rotate = (rotations = 0) => {
      let grid = this.clone()
      for (let i = 0; i < rotations; i++) grid = grid.rotate()
      return grid
    }

    for (let i = 0; i <= 3; i++) {
      const rotated = rotate(i)
      const flipped = rotated.flip()
      variants.push(rotated)
      variants.push(flipped)
    }

    return variants
  }

  /**
   * Return a Map representation of the grid where keys are positions as points
   * and values are their corresponding value.
   */
  toMap() {
    return this.reduce<Map<Point, T>>(
      (map, value, coords) => map.set($.toPoint(coords), value),
      new Map()
    )
  }

  /**
   * Return an object representation of the grid where keys are positions as
   * points and values are their corresponding value.
   */
  toObj() {
    return this.reduce<Record<Point, T>>((obj, value, coords) => {
      obj[$.toPoint(coords)] = value
      return obj
    }, {})
  }
}

export default Grid
