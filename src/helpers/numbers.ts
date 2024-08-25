import match from './match'

/**
 * Retrieve all numbers from the given string in a safe way.
 * @param string - String to get numbers from
 */
const numbers = (string: string) => match(string, /-?\d+/g).map(Number)

export default numbers
