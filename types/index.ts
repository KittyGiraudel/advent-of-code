export { SearchCosts, SearchGraph, SearchResult } from '../helpers/pathfinding'

export type Coords = [number, number, number?, number?]
export type CoordsObj = { x: number; y: number; z?: number; t?: number }
export type CoordsAndPoint = { coords: Coords; point: Point }
export type Point = `${number},${number}`
export type TriPoint = `${number},${number},${number}`
export type Grid<T> = T[][]
