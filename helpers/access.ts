import { Grid, Coords } from '../types'

/**
 * Attempt to read the value in the given grid at the given coordinates.
 * @param grid - Grid to read value from
 * @param coords - Y,X set of coordinates
 */
const access = <T>(grid: Grid<T>, coords: Coords): T =>
  grid?.[coords[0]]?.[coords[1]]

export default access
