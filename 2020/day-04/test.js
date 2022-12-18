const test = require('ava')
const { isValidLoose, isValidStrict, VALIDATORS } = require('.')
const passports = require('../../helpers/readInput')(__dirname, '\n\n')

test('Day 04 — Sample', t => {
  t.is(
    isValidLoose(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
  byr:1937 iyr:2017 cid:147 hgt:183cm`),
    true
  )
  t.is(
    isValidLoose(`iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
  hcl:#cfa07d byr:1929`),
    false
  )
  t.is(
    isValidLoose(`hcl:#ae17e1 iyr:2013
  eyr:2024
  ecl:brn pid:760753108 byr:1931
  hgt:179cm`),
    true
  )
  t.is(
    isValidLoose(`hcl:#cfa07d eyr:2025 pid:166559648
  iyr:2011 ecl:brn hgt:59in`),
    false
  )
  t.is(VALIDATORS.byr('2002'), true)
  t.is(VALIDATORS.byr('2003'), false)
  t.is(VALIDATORS.eyr('1920'), false)
  t.is(VALIDATORS.hgt('60in'), true)
  t.is(VALIDATORS.hgt('190cm'), true)
  t.is(VALIDATORS.hgt('190in'), false)
  t.is(VALIDATORS.hgt('190'), false)
  t.is(VALIDATORS.hcl('#123abc'), true)
  t.is(VALIDATORS.hcl('#123abz'), false)
  t.is(VALIDATORS.hcl('123abc'), false)
  t.is(VALIDATORS.ecl('brn'), true)
  t.is(VALIDATORS.ecl('wat'), false)
  t.is(VALIDATORS.pid('000000001'), true)
  t.is(VALIDATORS.pid('0123456789'), false)

  t.is(
    isValidStrict(`eyr:1972 cid:100
    hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926`),
    false
  )
  t.is(
    isValidStrict(`iyr:2019
    hcl:#602927 eyr:1967 hgt:170cm
    ecl:grn pid:012533040 byr:1946`),
    false
  )
  t.is(
    isValidStrict(`hcl:dab227 iyr:2012
    ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277`),
    false
  )
  t.is(
    isValidStrict(`hgt:59cm ecl:zzz
    eyr:2038 hcl:74454a iyr:2023
    pid:3556412378 byr:2007`),
    false
  )

  t.is(
    isValidStrict(`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f`),
    true
  )
  t.is(
    isValidStrict(`eyr:2029 ecl:blu cid:129 byr:1989
    iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm`),
    true
  )
  t.is(
    isValidStrict(`hcl:#888785
    hgt:164cm byr:2001 iyr:2015 cid:88
    pid:545766238 ecl:hzl
    eyr:2022`),
    true
  )
  t.is(
    isValidStrict(
      `iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`
    ),
    true
  )
})

test('Day 04 — Solutions', t => {
  t.is(passports.filter(isValidLoose).length, 190)
  t.is(passports.filter(isValidStrict).length, 121)
})
