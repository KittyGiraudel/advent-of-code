module.exports = (array, index, value) => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
]
