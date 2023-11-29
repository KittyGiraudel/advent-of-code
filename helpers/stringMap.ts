/**
 * Map over a string character by character to process them with the given
 * callback.
 */
const stringMap = (
  string: string,
  callback: (value: string, index: number, array: string[]) => string
) => Array.from(string).map(callback).join('')

export default stringMap
