const product = (array, init = 1) => array.reduce((a, b) => a * b, init)

module.exports = product
