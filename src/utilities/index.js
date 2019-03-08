/* eslint-disable camelcase */

// packages
import dotenv from 'dotenv'

/**
 * @file Manages utility module references
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// configure environment variables
dotenv.config()

export { cleanup_unit_tests, validate_schema } from './app.utilities'
export { create_firebase_user, read, verify_token } from './firebase.utilities'
export { success, throw_error } from './response.utilities'
