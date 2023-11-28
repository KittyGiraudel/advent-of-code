import { Range } from '../../types'

const parseRange = (range: string): Range =>
  range.split('-').map(Number) as Range

const parseLine = (line: string): Range[] => line.split(',').map(parseRange)

const includes = (a: Range, b: Range): boolean => {
  if (a[0] >= b[0] && a[1] <= b[1]) return true
  if (b[0] >= a[0] && b[1] <= a[1]) return true
  return false
}

const intersects = (a: Range, b: Range): boolean => {
  if (a[1] >= b[0] && a[0] <= b[1]) return true
  if (a[0] >= b[1] && a[1] <= b[0]) return true
  return false
}

export const getInclusions = (lines: string[]): number =>
  lines.map(parseLine).filter(([a, b]) => includes(a, b)).length

export const getOverlaps = (lines: string[]): number =>
  lines.map(parseLine).filter(([a, b]) => includes(a, b) || intersects(a, b))
    .length
