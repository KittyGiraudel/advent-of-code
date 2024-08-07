function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Count the number of occurrences of the given needle in the given haystack.
 */
const countInString = (
  haystack: string,
  needle: string,
  insensitive = true,
  escapeRE = true
) => {
  const flags = ['g', insensitive ? 'i' : ''].join('')
  const regex = new RegExp(
    `(?=(${escapeRE ? escapeRegExp(needle) : needle}))`,
    flags
  )
  const matches = haystack.matchAll(regex)

  return Array.from(matches).length || 0
}

export default countInString
