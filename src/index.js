/* eslint-disable camelcase */

// packages
import dotenv from 'dotenv'

// config
import FEATHERS_APP from './config/routes.config'
import {
  FUNCTIONS_HTTPS_REFERENCE, FUNCTIONS_USER_REFERENCE
} from './config/firebase.config'

/**
 * @file Manages server listening sequence and exposure of Cloud functions
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// configure environment variables
dotenv.config()

const { NODE_ENV, PORT } = process.env

// start the server
const SERVER = FEATHERS_APP.listen(PORT)

SERVER.on('listening', () => {
  let message = `Listening on port ${PORT}`

  if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    message += (`\nServer ready at http://localhost:${PORT}`)
  }

  console.info(message)
})

/**
 * Firebase cloud function that serves the API.
 */
const api = FUNCTIONS_HTTPS_REFERENCE.onRequest(SERVER)

/**
 * Sends a usage report to Slack when a new user is created, and a welcome email
 * to the new user.
 */
const complete_signup = FUNCTIONS_USER_REFERENCE.onCreate((snap, context) => {

})

export { complete_signup, api }