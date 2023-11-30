import {
  Coords,
  TriCoords,
  QuadriCoords,
  CoordsObj,
  TriCoordsObj,
  QuadriCoordsObj,
} from '../types'

/**
 * Transform coords expressed as an array of number into an object of coords.
 */
function toCoordsObj(coords: Coords): CoordsObj
function toCoordsObj(coords: TriCoords): TriCoordsObj
function toCoordsObj(coords: QuadriCoords): QuadriCoordsObj
function toCoordsObj(coords: number[]) {
  if (typeof coords === 'object' && !Array.isArray(coords)) return coords
  if (coords.length === 4)
    return { x: coords[0], y: coords[1], z: coords[2], t: coords[3] }
  if (coords.length === 3) return { x: coords[0], y: coords[1], z: coords[2] }
  return { x: coords[0], y: coords[1] }
}

export default toCoordsObj
