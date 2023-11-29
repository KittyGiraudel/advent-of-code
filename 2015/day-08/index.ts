import $ from '../../helpers'

export const decode = (strings: Array<string>) =>
  $.sum(strings.map(raw => raw.length - eval(raw).length))

export const encode = (strings: Array<string>) =>
  $.sum(strings.map(raw => JSON.stringify(raw).length - raw.length))
