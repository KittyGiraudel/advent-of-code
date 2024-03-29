import $ from '../../helpers'

export const decode = (strings: string[]) =>
  $.sum(strings.map(raw => raw.length - (eval(raw) as string).length))

export const encode = (strings: string[]) =>
  $.sum(strings.map(raw => JSON.stringify(raw).length - raw.length))
