// Return all possible permutations of the array.
// @param {Array} array - Array to get permutations from
// @return {Array[]}
const permutations = array => {
  var results = []

  function permute(arr, memo = []) {
    let curr

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

module.exports = permutations