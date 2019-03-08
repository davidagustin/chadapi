/* eslint-disable camelcase */

// packages
import dotenv from 'dotenv'

// config
import FEATHERS_APP from './routes.config'
import {
  FUNCTIONS_HTTPS_REF, FUNCTIONS_USER_DB_REF
} from './firebase.config'

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
const api = FUNCTIONS_HTTPS_REF.onRequest(SERVER)

/**
 * Sends a usage report to Slack when a new user is created, and a welcome email
 * to the new user.
 */
const complete_signup = FUNCTIONS_USER_DB_REF.onCreate((snap, context) => {

})

export { complete_signup, api }
