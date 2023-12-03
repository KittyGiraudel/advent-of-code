import match from './match'

const numbers = (string: string) => match(string, /\d+/g).map(Number)

export default numbers
