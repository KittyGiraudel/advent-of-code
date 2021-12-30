const toBin = value => (value >>> 0).toString(2).padStart(36, '0')

module.exports = toBin
