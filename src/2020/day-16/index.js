const $ = require('../../helpers')

// Parse the given values
// @param {String} rawRules - Raw rules
// @param {String} rawTicket - Raw ticket
// @param {String} rawNearbyTickets - Raw nearby tickets
// @return {Object}
const parseInput = ([rawRules, rawTicket, rawNearbyTickets]) => ({
  rules: rawRules
    .split('\n')
    .map(line => line.match(/([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/))
    .map(match => [match[1], [+match[2], +match[3]], [+match[4], +match[5]]]),
  ticket: rawTicket.split('\n')[1].split(',').map(Number),
  nearbyTickets: rawNearbyTickets
    .split('\n')
    .slice(1)
    .map(ticket => ticket.split(',').map(Number)),
})

// Return whether a given value matches any of the two ranges of a given rule.
// @param {Number} value - Value to validate
// @param {Rule} rule - Rule to validate the value against
// @return {Boolean}
const isValueMatchingRule = (value, rule) =>
  $.isClamped(value, ...rule[1]) || $.isClamped(value, ...rule[2])

// Return whether a given value matches some of the given rules.
// @param {Number} value - Value to validate
// @param {Rule[]} rules - Rules to validate the value against
// @return {Boolean}
const isValueValid = (value, rules) =>
  rules.some(rule => isValueMatchingRule(value, rule))

// Return whether a given ticket is valid.
// @param {Number} ticket - Ticket to validate
// @param {Rule[]} rules - Rules to validate the ticket against
// @return {Boolean}
const isTicketValid = (ticket, rules) =>
  ticket.every(value => isValueValid(value, rules))

// Return the scanning error rate by adding all the invalid values found in all
// the given nearby tickets.
// @param {Number[][]} tickets - Tickets to scan
// @param {Rule[]} rules - Rules to validate the tickets against
// @return {Number}
const getScanningErrorRate = (tickets, rules) =>
  $.sum(tickets.flat().filter(value => !isValueValid(value, rules)))

// Return whether the given value is an array with a single item.
// @param {String|String[]} entry - Entry to test
// @return {Boolean}
const hasSingleOption = entry => Array.isArray(entry) && entry.length === 1

// Return an array where every position contains all the rule names that can
// possibly be at that index given the validity of nearby tickets.
// @param {Number[][]} tickets - Valid nearby tickets
// @param {Rule[]} rules - Rules to validate the tickets against
// @return {String[][]}
const getRulesPossibilities = (tickets, rules) => {
  let possibilities = $.array(rules.length).map(() => [])

  rules.forEach(rule => {
    const name = rule[0]

    for (let i = 0; i < tickets[0].length; i++) {
      const values = tickets.map(ticket => ticket[i])
      const allPass = values.every(value => isValueMatchingRule(value, rule))

      if (allPass) possibilities[i].push(name)
    }
  })

  return possibilities
}

// Resolve rules possibitilies to return an order of rules (mutative).
// @param {String[][]} possibilities - Rules possibilities
// @return {String[]}
const resolveRulesPossibitilies = possibilities => {
  // Find a position which has a single option
  let index = possibilities.findIndex(hasSingleOption)

  while (index !== -1) {
    const value = possibilities[index][0]

    // Unwrap it from its array
    // Go through all positions, and remove this option from their array
    possibilities = possibilities.map((entry, i) =>
      i === index
        ? value
        : Array.isArray(entry)
        ? entry.filter(e => e !== value)
        : entry
    )

    // Look for another entry which has a single option
    index = possibilities.findIndex(hasSingleOption)
  }

  return possibilities
}

// Get the order of rules (names only) given the tickets’ validity.
// @param {Number[][]} tickets - Valid nearby tickets
// @param {Rule[]} rules - Rules to validate the tickets with and determine the
//                         order from
// @return {String[]} Ordered rule names
const getRulesOrder = (tickets, rules) =>
  resolveRulesPossibitilies(getRulesPossibilities(tickets, rules))

// Get the ticket value.
// @param {String[]} input - Raw puzzle input
// @return {Number}
const getTicketValue = input => {
  const { nearbyTickets, ticket, rules } = parseInput(input)
  const tickets = nearbyTickets.filter(ticket => isTicketValid(ticket, rules))
  const sortedRules = getRulesOrder(tickets, rules)

  return $.product(
    ticket.map((v, i) => (/^departure/.test(sortedRules[i]) ? v : 1))
  )
}

module.exports = {
  parseInput,
  getScanningErrorRate,
  getRulesOrder,
  getTicketValue,
}
