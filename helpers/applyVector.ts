import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Apply the given vector to the given X,Y(,Z) coords.
 */
function applyVector(coords: Coords, vector: Coords): Coords
function applyVector(coords: TriCoords, vector: TriCoords): TriCoords
function applyVector(coords: QuadriCoords, vector: QuadriCoords): QuadriCoords
function applyVector(coords: number[], vector: number[]) {
  return [
    coords[0] + vector[0],
    coords[1] + vector[1],
    !isNaN(coords[2]) && !isNaN(vector[2]) ? coords[2] + vector[2] : null,
  ].filter(segment => segment !== null) as number[]
}

export default applyVector
