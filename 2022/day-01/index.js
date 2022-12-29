import $ from '../../helpers'

const parseGroup = group => group.split('\n').map(Number)
const parseGroups = groups => groups.map(parseGroup)
const processGroups = groups => parseGroups(groups).map(group => $.sum(group))

export const findHighestGroup = groups => Math.max(...processGroups(groups))
export const findHighestGroups = (groups, count) =>
  $.sum(
    processGroups(groups)
      .sort((a, b) => b - a)
      .slice(0, count)
  )
