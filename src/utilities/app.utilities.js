/* eslint-disable camelcase */

// packages
import { Joi } from 'celebrate'
import { BadRequest } from '@feathersjs/errors'

// config
import {
  FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE
} from '../config/firebase.config'

/**
 * @file A set of utility functions for interacting with the application.
 * @module AppUtilities
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * This function takes a uid and removes the Firebase user's references from
 * Authenication, the Realtime Database, and Firebase Storage.
 *
 * @param {*} uid
 * @returns {boolean} if references are removed successfully
 */
export const cleanup_unit_tests = async uid => {
  try {
    console.warn('Cleaning up unit tests...')

    let user_path = `/users/${uid}`

    await FIREBASE_AUTH.deleteUser(uid)
    await FIREBASE_DATABASE.ref(user_path).remove()
    // await FIREBASE_STORAGE.bucket(user_path).delete()

    console.log('Cleaned up unit tests.')

    return true
  } catch (error) {
    console.warn('Error cleaning up unit tests: ', error)
    return false
  }
}

/**
 * Compares the first argument against the schema provided in the first
 * argument.
 *
 * @param {*} data - value being validated
 * @param {ObjectSchema} schema - schema to check against
 * @returns {*} value if schema is valid
 * @throws {BadRequest} if error validating schema
 */
export const validate_schema = (data, schema) => {
  const result = JOI.validate(data, schema, { escapeHtml: true })

  if (result.error) {
    console.error(`Validation error: ${result.error.message}\n`, data)
    throw new BadRequest(`Validation error: ${result.error.message}`)
  }

  return result.value
}
