import $ from '../../helpers'

const getPriority = (letter: string): number =>
  letter.charCodeAt(0) - (letter === letter.toUpperCase() ? 38 : 96)

const half = (string: string): [string, string] => [
  string.slice(0, string.length / 2),
  string.slice(string.length / 2),
]

const getTotalPriority = (groups: string[][]): number =>
  $.sum(
    groups
      // Thankfully, the `intersection` helper works on strings the same as it
      // does for arrays, so there is no need for casting strings into arrays.
      .map(group => $.intersection(...group))
      // There should be only one common item across groups, so the first item
      // in the resulting array needs to be picked.
      .map(intersection => intersection[0])
      // Then resolve the priority for that common item according to the rules.
      .map(getPriority)
  )

// For part 1, each line is broken into 2 halves, their intersection is found,
// its priority is computed and the sum of all priorities is the result.
export const process = (rusacks: string[]): number =>
  getTotalPriority(rusacks.map(half))

// For part 2, lines are grouped by 3, the group intersection is found, its
// priority is computed and the sum of all group priorities is the result.
export const processGroups = (rusacks: string[]): number =>
  getTotalPriority($.chunk(rusacks, 3))
