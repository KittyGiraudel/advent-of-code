import * as util from 'node:util'

/**
 * Inspect the given value.
 */
const inspect = (
  value: any,
  showHidden: boolean = true,
  depth: number = Infinity,
  color: boolean = true
) => util.inspect(value, showHidden, depth, color)

export default inspect
