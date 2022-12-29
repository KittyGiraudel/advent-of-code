import util from 'util'

const inspect = (value, showHidden = true, depth = Infinity, color = true) =>
  util.inspect(value, showHidden, depth, color)

export default inspect
