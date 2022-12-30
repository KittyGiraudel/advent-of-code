// Count the number of occurrences of the given needle in the given haystack.
const countInString = (
  haystack: string,
  needle: string,
  insensitive: Boolean = true
): number =>
  Array.from(
    haystack.matchAll(
      new RegExp(`(?=(${needle}))`, ['g', insensitive ? 'i' : ''].join(''))
    )
  ).length || 0

export default countInString
