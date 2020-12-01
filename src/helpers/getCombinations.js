function getCombinations(array, n, start = [], tmp = []) {
  return array.reduce((acc, item, index, array) => {
    if (n > 1) {
      tmp.push(item)
      getCombinations(array.slice(index + 1), n - 1, acc, tmp)
    } else {
      acc.push((tmp.push(item), tmp).slice(0))
    }

    tmp.pop()

    return acc
  }, start)
}

module.exports = getCombinations
