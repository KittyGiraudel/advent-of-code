import { Coords } from '../types'

const shoelace = (vertices: Coords[]) => {
  let area = 0

  for (let i = 0; i < vertices.length; i++) {
    const [currY, currX] = vertices[i]
    const [nextY, nextX] = vertices[(i + 1) % vertices.length]
    area += currX * nextY - currY * nextX
  }

  return Math.abs(area / 2)
}

export default shoelace
