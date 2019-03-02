/* eslint-disable camelcase */

// packages
import axios from 'axios'

// config
import { JOI } from '../config/app.config'
import {
  FIREBASE_AUTH, FIREBASE_DATABASE, FIREBASE_STORAGE
} from '../config/firebase.config'

// modules
import { success, throw_error } from './response.utilities'

/**
 * @file A set of utility functions for interacting with the application.
 * @module app
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
 * Forms a request.
 *
 * @param {string} method - method action
 * @param {string} url - url endpoint to request
 * @param {*} data - data to send with request
 * @param {string} response_type - data response type
 */
export const request = async (method, url, data, response_type) => {
  try {
    let req = await axios({
      crossdomain: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      method: method,
      url: url,
      data: data,
      responseType: response_type
    })

    return success({
      status: 200, message: 'Retreived data.', data: req.data
    })
  } catch (error) {
    return throw_error({
      status: error.response.status, message: error.response.data.error
    })
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
    return throw_error({ status: 400, message: result.error.message })
  }

  return result.value
}
