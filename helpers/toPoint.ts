import { Coords, Point } from '../types'

// Join a coordinate expressed as an array into a string separated by comma,
// typically to use it as a key for a map or a set.
const toPoint = (coords: Coords): Point => coords.join(',') as Point

export default toPoint
