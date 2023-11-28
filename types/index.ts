export { SearchCosts, SearchGraph, SearchOutput } from '../helpers/pathfinding'
export { Grid } from '../helpers/grid'

export type Range = [number, number]
export type Coords = [number, number, number?, number?]
export type CoordsObj = { x: number; y: number; z?: number; t?: number }
export type CoordsAndPoint = { coords: Coords; point: Point }
export type Point = `${number},${number}`
export type TriPoint = `${number},${number},${number}`
export type ValueOrArray<T> = T | Array<ValueOrArray<T>>
