import $ from '../../helpers'

type Rule = [string, [number, number], [number, number]]
type Ticket = number[]
type Possibility = string[]

type Input = {
  rules: Rule[]
  ticket: Ticket
  nearbyTickets: Ticket[]
}

// Parse the given values
// @param rawRules - Raw rules
// @param rawTicket - Raw ticket
// @param rawNearbyTickets - Raw nearby tickets
export const parseInput = ([
  rawRules,
  rawTicket,
  rawNearbyTickets,
]: string[]): Input => ({
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
// @param value - Value to validate
// @param rule - Rule to validate the value against
const isValueMatchingRule = (value: number, rule: Rule): boolean =>
  $.isClamped(value, ...rule[1]) || $.isClamped(value, ...rule[2])

// Return whether a given value matches some of the given rules.
// @param value - Value to validate
// @param rules - Rules to validate the value against
const isValueValid = (value: number, rules: Rule[]): boolean =>
  rules.some(rule => isValueMatchingRule(value, rule))

// Return whether a given ticket is valid.
// @param ticket - Ticket to validate
// @param rules - Rules to validate the ticket against
const isTicketValid = (ticket: Ticket, rules: Rule[]): boolean =>
  ticket.every(value => isValueValid(value, rules))

// Return the scanning error rate by adding all the invalid values found in all
// the given nearby tickets.
// @param tickets - Tickets to scan
// @param rules - Rules to validate the tickets against
export const getScanningErrorRate = (
  tickets: Ticket[],
  rules: Rule[]
): number => $.sum(tickets.flat().filter(value => !isValueValid(value, rules)))

// Return whether the given value is an array with a single item.
// @param entry - Entry to test
const hasSingleOption = (entry: string | string[]): boolean =>
  Array.isArray(entry) && entry.length === 1

// Return an array where every position contains all the rule names that can
// possibly be at that index given the validity of nearby tickets.
// @param tickets - Valid nearby tickets
// @param rules - Rules to validate the tickets against
const getRulesPossibilities = (
  tickets: Ticket[],
  rules: Rule[]
): Possibility[] => {
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
// @param possibilities - Rules possibilities
const resolveRulesPossibitilies = (possibilities: Possibility[]): string[] => {
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
// @param tickets - Valid nearby tickets
// @param rules - Rules to validate the tickets with and determine the order from
// @return Ordered rule names
export const getRulesOrder = (tickets: Ticket[], rules: Rule[]): string[] =>
  resolveRulesPossibitilies(getRulesPossibilities(tickets, rules))

// Get the ticket value.
// @param input - Raw puzzle input
export const getTicketValue = (input: string[]): number => {
  const { nearbyTickets, ticket, rules } = parseInput(input)
  const tickets = nearbyTickets.filter(ticket => isTicketValid(ticket, rules))
  const sortedRules = getRulesOrder(tickets, rules)

  return $.product(
    ticket.map((v, i) => (/^departure/.test(sortedRules[i]) ? v : 1))
  )
}
