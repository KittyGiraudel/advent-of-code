import $ from '../../helpers'

const parseGroup = (group: string) => group.split('\n').map(Number)
const parseGroups = (groups: Array<string>) => groups.map(parseGroup)
const processGroups = (groups: Array<string>) =>
  parseGroups(groups).map(group => $.sum(group))

export const findHighestGroup = (groups: Array<string>) =>
  Math.max(...processGroups(groups))

export const findHighestGroups = (groups: Array<string>, count: number) =>
  $.sum(
    processGroups(groups)
      .sort((a, b) => b - a)
      .slice(0, count)
  )
