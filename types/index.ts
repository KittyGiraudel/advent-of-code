export type { SearchCosts, SearchGraph, SearchOutput } from '../helpers/search'

import type GridClass from '../helpers/Grid'

export type Grid<T> = InstanceType<typeof GridClass<T>>
export type Coords = [number, number]
export type Point = `${number},${number}`
export type CoordsAndPoint = { coords: Coords; point: Point }

export type TriCoords = [number, number, number]
export type TriPoint = `${number},${number},${number}`
export type TriCoordsAndPoint = { coords: TriCoords; point: TriPoint }

export type QuadriCoords = [number, number, number, number]
export type QuadriPoint = `${number},${number},${number},${number}`
export type QuadriCoordsAndPoint = { coords: QuadriCoords; point: QuadriPoint }

export type ValueOrArray<T> = T | ValueOrArray<T>[]

// See: https://stackoverflow.com/a/60762482
export type LengthArray<
  T,
  N extends number,
  R extends T[] = []
> = number extends N
  ? T[]
  : R['length'] extends N
  ? R
  : LengthArray<T, N, [T, ...R]>

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
