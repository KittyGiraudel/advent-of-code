export { SearchCosts, SearchGraph, SearchOutput } from '../helpers/pathfinding'
export { Grid } from '../helpers/grid'

export type Coords = [number, number]
export type CoordsObj = { x: number; y: number }
export type Point = `${number},${number}`
export type CoordsAndPoint = { coords: Coords; point: Point }

export type TriCoords = [number, number, number]
export type TriCoordsObj = { x: number; y: number; z: number }
export type TriPoint = `${number},${number},${number}`
export type TriCoordsAndPoint = { coords: TriCoords; point: TriPoint }

export type QuadriCoords = [number, number, number, number]
export type QuadriCoordsObj = { x: number; y: number; z: number; t: number }
export type QuadriPoint = `${number},${number},${number},${number}`
export type QuadriCoordsAndPoint = { coords: QuadriCoords; point: QuadriPoint }

export type ValueOrArray<T> = T | ValueOrArray<T>[]
