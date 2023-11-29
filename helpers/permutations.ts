/**
 * Return all possible permutations of the array.
 */
const permutations = <T>(array: Array<T>) => {
  const results: Array<Array<T>> = []

  function permute(arr: Array<T>, memo: Array<T> = []) {
    let curr: Array<T>

    for (var i = 0; i < arr.length; i++) {
      curr = arr.splice(i, 1)
      if (arr.length === 0) results.push(memo.concat(curr))
      permute(arr.slice(), memo.concat(curr))
      arr.splice(i, 0, curr[0])
    }

    return results
  }

  return permute(array.slice(0))
}

export default permutations
