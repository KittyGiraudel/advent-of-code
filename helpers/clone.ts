/**
 * Deep clone a data structure.
 * @TODO: replace with `structuredClone`
 */
const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export default clone
