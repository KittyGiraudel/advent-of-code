const $ = require('../../helpers')
const crypto = require('crypto')

const hash = value => crypto.createHash('md5').update(value).digest('hex')

const run = salt => {
  let password1 = []
  let password2 = $.array(8)
  let i = 0
  let curr = null

  while (true) {
    do curr = hash(salt + ++i)
    while (!curr.startsWith('00000'))

    const sixth = curr[5]
    const seventh = curr[6]

    if (password1.length < 8) password1.push(sixth)
    if (sixth <= 7 && !password2[sixth]) password2[sixth] = seventh
    if (password1.length === 8 && password2.every(Boolean)) break
  }

  return [password1.join(''), password2.join('')]
}

module.exports = { run }
