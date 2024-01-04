import $ from '../../helpers'
import { Coords, Point } from '../../types'

const parseLine = (line: string) =>
  line.split(',').map(i => [i[0], +i.slice(1)]) as [string, number][]

const draw = (line: [string, number][]) => {
  const visited = new Map<Point, number>()
  let curr: Coords = [0, 0]
  let steps = 0

  line.forEach(([direction, value]) => {
    for (let i = 0; i < value; i++) {
      const key = $.toPoint(curr)
      if (direction === 'R') curr[0] += 1
      if (direction === 'L') curr[0] -= 1
      if (direction === 'U') curr[1] -= 1
      if (direction === 'D') curr[1] += 1
      visited.set(key, steps)
      steps++
    }
  })

  visited.delete('0,0')

  return visited
}

const findIntersections = (lines: [string, string]) => {
  const maps = lines.map(parseLine).map(draw)
  const sets = maps.map(map => new Set(map.keys()))
  const intersections = Array.from(sets[0]).filter(x => sets[1].has(x))

  return { maps, intersections }
}

export const findClosestIntersection = (lines: [string, string]) => {
  const { intersections } = findIntersections(lines)
  const distances = intersections.map(coords =>
    $.sum(coords.split(',').map(value => Math.abs(+value)))
  )

  return Math.min(...distances)
}

export const findFastestIntersection = (lines: [string, string]) => {
  const { maps, intersections } = findIntersections(lines)
  const steps = intersections.map(coords =>
    $.sum(maps.map(map => map.get(coords) as number))
  )

  return Math.min(...steps)
}
