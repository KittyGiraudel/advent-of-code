// Deep clone a data structure.
const clone = <Type>(data: Type): Type => JSON.parse(JSON.stringify(data))

export default clone
