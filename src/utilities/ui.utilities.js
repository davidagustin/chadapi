/* eslint-disable camelcase */

// packages
import $ from 'jquery'

// utility functions
import { throw_error } from './response.utilities'

/**
 * @file UI utility functions
 * @module ui_utilities
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * This function takes a breakpoint and an operator argument and returns true if
 * the device width meets the specified arguments.
 *
 * @param {number} breakpoint - breakpoint detect changes
 * @param {string} operator - less | less_eq | greater | greater_eq
 * @throws {Error} if breakpoint or operator argument is invalid
 */
export const responsive = (breakpoint, operator) => {
  if (breakpoint && operator) {
    operator = operator.trim()
    let response = ''

    if (operator === 'less') {
      response = $(window).width() < breakpoint
    } else if (operator === 'less_eq') {
      response = $(window).width() <= breakpoint
    } else if (operator === 'greater') {
      response = $(window).width() > breakpoint
    } else if (operator === 'greater_eq') {
      response = $(window).width() >= breakpoint
    } else {
      return throw_error({ status: 400, message: `Invalid operator: ${operator}\nValid operators are less, less_eq, greater, and greater_eq` })
    }

    return response
  } else {
    return throw_error({
      status: 400,
      message: `Breakpoint: ${breakpoint}, Operator: ${operator}. Valid operators are less, less_eq, greater, and greater_eq`
    })
  }
}

/**
 * Returns the distance scrolled.
 */
export const scrolled = () => $(window).scroll(() => $(window).scrollTop())
