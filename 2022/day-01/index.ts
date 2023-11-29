import $ from '../../helpers'

const parseGroup = (group: string) => group.split('\n').map(Number)
const parseGroups = (groups: string[]) => groups.map(parseGroup)
const processGroups = (groups: string[]) =>
  parseGroups(groups).map(group => $.sum(group))

export const findHighestGroup = (groups: string[]) =>
  Math.max(...processGroups(groups))

export const findHighestGroups = (groups: string[], count: number) =>
  $.sum(
    processGroups(groups)
      .sort((a, b) => b - a)
      .slice(0, count)
  )
