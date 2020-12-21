const intersection = (...lists) => {
  const result = new Set()

  for (let i = 0; i < lists.length; i++) {
    for (let y = 0; y < lists[i].length; y++) {
      if (lists.every(obj => obj.includes(lists[i][y]))) result.add(lists[i][y])
    }
  }

  return [...result]
}

module.exports = intersection
