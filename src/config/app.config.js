// packages
import { Joi } from 'celebrate'

/**
 * @file Application constants and configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// package references
const JOI = Joi

// routes
const BASE_API_ROUTE = '/api/v1'

const ROUTES = {
  base: '/',
  api: BASE_API_ROUTE,
  users: `${BASE_API_ROUTE}/users`,
  rooms: `${BASE_API_ROUTE}/rooms`
}

// environment
const DEV_MODE = process.env.NODE_ENV === 'development'

export { JOI, ROUTES, DEV_MODE }
