const compose = (...functions) => args =>
  functions.reduceRight((arg, fn) => fn(arg), args)

module.exports = compose
