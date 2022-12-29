import $ from '../../helpers'

export const decode = strings =>
  $.sum(strings.map(raw => raw.length - eval(raw).length))

export const encode = strings =>
  $.sum(strings.map(raw => JSON.stringify(raw).length - raw.length))
