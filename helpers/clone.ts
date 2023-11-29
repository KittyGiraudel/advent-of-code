/**
 * Deep clone a data structure.
 * @TODO: replace with `structuredClone`
 */
const clone = (data: unknown) => JSON.parse(JSON.stringify(data))

export default clone
