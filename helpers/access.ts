import { Grid, Coords } from '../types'

// Attempt to read the value in the given grid at the given coordinates.
// @param grid - Grid to read value from
// @param coords - Y,X set of coordinates
const access = <Type>(grid: Grid<Type>, coords: Coords): Type =>
  grid?.[coords[0]]?.[coords[1]]

export default access
