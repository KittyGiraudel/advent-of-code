/**
 * Return the indices at which the needle string is found in the haystack
 * string.
 * @param haystack - String to search *in*
 * @param needle - String to search *for*
 */
const indices = (haystack: string, needle: string) => {
  const indices: number[] = []
  const regex = new RegExp(needle, 'g')

  let result: RegExpExecArray | null
  while ((result = regex.exec(haystack))) indices.push(result.index)

  return indices
}

export default indices
