const isNew = (array, value) => array.indexOf(value) == array.lastIndexOf(value)

const get = (numbers, target) => {
  const history = numbers.slice(0)
  const map = new Map(history.map((number, index) => [number, [index + 1]]))
  let last = history[history.length - 1]

  for (let i = history.length + 1; i <= target; i++) {
    const peek = map.get(last)
    last = peek.length === 1 ? 0 : peek[1] - peek[0]
    map.set(last, (map.get(last) || []).slice(-1).concat(i))
  }

  return last
}

module.exports = { get }
