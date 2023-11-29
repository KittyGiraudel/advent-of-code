/**
 * Count the number of occurrences of the given needle in the given haystack.
 */
const countInString = (
  haystack: string,
  needle: string,
  insensitive: Boolean = true
) => {
  const flags = ['g', insensitive ? 'i' : ''].join('')
  const regex = new RegExp(`(?=(${needle}))`, flags)
  const matches = haystack.matchAll(regex)

  return Array.from(matches).length || 0
}

export default countInString
