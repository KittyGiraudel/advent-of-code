import $ from '../../helpers'
import fs from 'fs'

// I spent a lot of time on this puzzle, but ultimately could not solve part 2.
// The way I approached it goes like this: recursively parse the regular
// expression into a data structure. Then, walk the structure to find the
// longest path. I am not sure my solution was 100% correct, but it did yield
// the correct answer for part 1.
//
// For part 2 however, I tried a few options, but could not hit the right
// answer. The closest I got was 8328, which was 26 away from the answer at
// 8354. I got there by walking my data structure again and incrementing the
// amount of doors passed for every room. I am genuinely not sure why I couldn’t
// find out the answer, because I managed to print out the map yielded by my
// data structure, and it looks legitimate, so I don’t know.
//
// Ultimately, I am defeated and this is a solution inspired by this Reddit
// comment:
// https://www.reddit.com/r/adventofcode/comments/a7uk3f/2018_day_20_solutions/ec61727/
const mapOut = input => {
  let curr = { x: 0, y: 0, distance: 0 }
  const stack = [curr]
  const map = new Map()

  function step(dx, dy) {
    const x = curr.x + dx
    const y = curr.y + dy
    const node = map.get(x + ',' + y) || { x, y, distance: Infinity }
    node.distance = Math.min(node.distance, curr.distance + 1)
    curr = node
    map.set(node.x + ',' + node.y, node)
  }

  Array.from(input).forEach(char => {
    if (char === 'N') step(0, -1)
    if (char === 'S') step(0, +1)
    if (char === 'E') step(+1, 0)
    if (char === 'W') step(-1, 0)
    if (char === '(') stack.push(curr)
    if (char === ')') curr = stack.pop()
    if (char === '|') curr = $.last(stack)
  })

  return Array.from(map.values()).map(room => room.distance)
}

/*
import { matchRecursive } from 'xregexp'

const OPTIONS = [
  '\\(',
  '\\)',
  'g',
  { valueNames: ['between', 'left', 'match', 'right'] },
]

// Splits the given string on top-level pipes, ignoring any pipe within parens.
const getOptions = string => {
  let balance = 0

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') balance++
    if (string[i] === ')') balance--
    if (string[i] === '|' && balance === 0)
      return [string.slice(0, i), getOptions(string.slice(i + 1))].flat()
  }

  return [string]
}

const parse = input => {
  input = input.replace(/[$^]/g, '')
  const data = []
  let match = matchRecursive(input, ...OPTIONS)
  let chunk = null

  if (!match.length) {
    return { value: input }
  }

  while ((chunk = match.shift())) {
    if (chunk.name === 'between') {
      data.push({ value: chunk.value })
    } else if (chunk.name === 'match') {
      data.push({ type: 'OR', children: getOptions(chunk.value).map(parse) })
    }
  }

  return data.length === 1 ? data[0] : { type: 'AND', children: data }
}

// This yields the correct data for part 1, but I have found an additional test
// case on Reddit which causes it to fail, so it’s certainly not bulletproof.
// It is not able to detect room duplicate if there are two non-intersecting
// paths to the room such as `^(E|SSEENNW)S$`. In a case like this, the function
// will return 8, while the result is 4 (SSEE).
const getScore = data => {
  if (typeof data.value === 'string') return data.value.length
  if (data.type === 'OR') {
    const scores = data.children.map(getScore)
    return scores.includes(0) ? 0 : Math.max(...scores)
  }
  if (data.type === 'AND') return $.sum(data.children.map(getScore))
}

const go = (axis, direction) => (map, state) => {
  state.position[axis] += direction
  if (!map.has($.toPoint(state.position))) {
    map.set($.toPoint(state.position), { value: axis === 0 ? '—' : '|' })
  }

  state.position[axis] += direction
  state.steps++
  if (!map.has($.toPoint(state.position))) {
    // To get the same result as `getScore` with this function, the steps need
    // to be incremented even if we have already reached this room (one line up)
    // which I don’t quite get why I must say.
    map.set($.toPoint(state.position), { value: '.', steps: state.steps })
  }
}

const STEPS = { N: go(0, -1), S: go(0, +1), W: go(1, -1), E: go(1, +1) }

const drawMap = (map, state, item) => {
  if (typeof item.value === 'string') {
    return Array.from(item.value)
      .map(char => STEPS[char])
      .map(step => step(map, state))
  }

  if (item.type === 'OR') {
    const clone = $.clone(state)

    return item.children.forEach(child => {
      drawMap(map, state, child)
      state.steps = clone.steps
      state.position = clone.position
    })
  }

  if (item.type === 'AND') {
    return item.children.forEach(child => drawMap(map, state, child))
  }

  throw new Error('Invalid item for map drawing')
}

const createGrid = map => {
  const coords = Array.from(map.keys()).map($.toCoords)
  const [minY, maxY, minX, maxX] = $.boundaries(coords)

  // Initialize grid.
  const width = maxX + 1 - minX
  const height = maxY + 1 - minY
  const grid = $.grid.init(width, height, '#')

  // Draw all rooms.
  coords.forEach(([ri, ci]) => {
    grid[ri - minY][ci - minX] = map.get(`${ri},${ci}`).value
  })

  // Add outer walls.
  grid.unshift('#'.repeat(width).split(''))
  grid.push('#'.repeat(width).split(''))
  grid.forEach(row => [row.unshift('#'), row.push('#')])

  return grid
}

const getRoomDistances = map =>
  Array.from(map.values())
    .map(room => room.steps)
    .filter(Boolean)

const mapOut = input => {
  const data = parse(input)
  const map = new Map()
  const state = { position: [0, 0], steps: 0 }

  map.set($.toPoint(state.position), { value: '@', steps: state.steps })
  drawMap(map, state, data)

  //fs.writeFileSync('./dump.1.txt', $.grid.render(createGrid(map)))

  return getRoomDistances(map)
}
*/

export const getLongestDistance = input => Math.max(...mapOut(input))

export const getDistancesAbove = (input, limit) =>
  mapOut(input).filter(distance => distance >= limit).length
