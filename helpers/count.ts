// Count the occurrences of every item in the given array and return an object
// mapping items to their count.
const count = (array: any[]): { [key: string]: number } =>
  array.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
  }, {})

export default count
