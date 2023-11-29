import $ from '../../helpers'

export const run = (salt: string): [string, string] => {
  let password1: Array<string> = []
  let password2: Array<string | undefined> = $.array(8)
  let i = 0
  let curr = null

  while (true) {
    do curr = $.md5(salt + ++i)
    while (!curr.startsWith('00000'))

    const sixth = curr[5]
    const seventh = curr[6]

    if (password1.length < 8) password1.push(sixth)
    if (sixth <= 7 && !password2[sixth]) password2[sixth] = seventh
    if (password1.length === 8 && password2.every(Boolean)) break
  }

  return [password1.join(''), password2.join('')]
}
