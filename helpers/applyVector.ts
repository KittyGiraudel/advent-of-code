import { Coords } from '../types'

/**
 * Apply the given vector to the given X,Y(,Z) coords.
 */
const applyVector = (coords: Coords, vector: Coords): Coords =>
  [
    coords[0] + vector[0],
    coords[1] + vector[1],
    !isNaN(coords[2]) && !isNaN(vector[2]) ? coords[2] + vector[2] : null,
  ].filter(segment => segment !== null) as Coords

export default applyVector
