function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Count the number of occurrences of the given needle in the given haystack.
 */
const countInString = (
  haystack: string,
  needle: string,
  insensitive: boolean = true,
  escape: boolean = true
) => {
  const flags = ['g', insensitive ? 'i' : ''].join('')
  const regex = new RegExp(
    `(?=(${escape ? escapeRegExp(needle) : needle}))`,
    flags
  )
  const matches = haystack.matchAll(regex)

  return Array.from(matches).length || 0
}

export default countInString
