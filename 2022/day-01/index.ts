import $ from '../../helpers'

const parseGroup = (group: string): number[] => group.split('\n').map(Number)
const parseGroups = (groups: string[]): number[][] => groups.map(parseGroup)
const processGroups = (groups: string[]): number[] =>
  parseGroups(groups).map(group => $.sum(group))

export const findHighestGroup = (groups: string[]): number =>
  Math.max(...processGroups(groups))

export const findHighestGroups = (groups: string[], count: number): number =>
  $.sum(
    processGroups(groups)
      .sort((a, b) => b - a)
      .slice(0, count)
  )
