const hexToBin = hex => ('00000000' + parseInt(hex, 16).toString(2)).substr(-4)

module.exports = hexToBin
