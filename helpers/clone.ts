// Deep clone a data structure.
const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export default clone
