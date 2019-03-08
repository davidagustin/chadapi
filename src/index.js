/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

// packages
import dotenv from 'dotenv'
import '@babel/polyfill'

// config
import SERVER from './config/server.config'
import {
  FUNCTIONS_HTTPS_REF, FUNCTIONS_USER_DB_REF
} from './config/firebase.config'

// configure environment variables
dotenv.config()

/**
 * Firebase cloud function that serves the API.
 */
const api = FUNCTIONS_HTTPS_REF.onRequest((req, res) => {
  let message = 'Received external request for API.'

  res.send(message)
  console.info(message)
})

/**
 * Sends a usage report to Slack when a new user is created, and a welcome email
 * to the new user.
 */
const complete_signup = FUNCTIONS_USER_DB_REF.onCreate((snap, context) => {
  console.info('New database user. Triggering complete_signup...\n')
})

export { api, complete_signup }
