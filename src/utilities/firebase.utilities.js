/* eslint-disable camelcase */

// packages
import { BadRequest } from '@feathersjs/errors'

// config
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../config/firebase.config'

// modules
import { throw_error, success } from './response.utilities'

/**
 * A set of Firebase utility functions. Firebase must be initialized first.
 *
 * @file Utility functions for interacting with Firebase
 * @module FirebaseUtilities
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * This function creates a new Firebase user and returns the data argument with
 * a modified display_name property. The function also adds a uid property to
 * the data. The data is expected to be validated by the User service hook
 * before being passed into the function.
 *
 * @param {object} data - new user data
 * @returns {object} modified data
 * @throws {BadRequest} if error creating Firebase account
 */
export const create_firebase_user = async data => {
  console.info('Creating Firebase user...')
  const { first, last } = data.display_name

  try {
    let new_user = await FIREBASE_AUTH.createUser({
      displayName: `${first}${last ? ` ${last}` : ''}`,
      email: data.email,
      password: data.password
    })

    console.info('Created Firebase user: \n', new_user)

    data.display_name = new_user.displayName
    data.uid = new_user.uid

    // remove sensitive information
    delete data.password
    delete data.c_password

    return data
  } catch (error) {
    let message = `Error creating Firebase user: ${error.errorInfo.message}`
    let err = throw_error({
      status: 400, messsage: message
    })

    console.error(message)
    throw new BadRequest(JSON.stringify(err))
  }
}

/**
 * This functions takes a read request object, containing a location property
 * and a filter object.
 *
 * @param {object} request - read request options
 * @returns {object} success object if read is successfull
 * @throws {FirebaseError} if error searching database
 */
export const read = async request => {
  const { location, filter } = request
  const { type, identifier } = filter

  let ref = FIREBASE_DATABASE.ref(location)
  let data = []

  try {
    if (type && identifier) {
      // if there are filter options, filter the data
      (await ref.orderByChild(type).once('value')).forEach(child => {
        child = child.val()
        return child[type] === identifier ? data.push(child) : null
      })
    } else {
      // parse user data
      (await ref.once('value')).forEach(child => {
        const ENVIRONMENTS = ['development', 'test']

        if (ENVIRONMENTS.includes(process.env.NODE_ENV)) {
          data.push(child.val())
        } else {
          if (child.key !== 'PLACEHOLDER') {
            data.push(child.val())
          }
        }
      })
    }

    return success({
      status: 200, message: `Retreived data at ${location}.`, data: data
    })
  } catch (error) {
    return throw_error({
      status: 500, message: `Retreived data at ${location}.`, data: data
    })
  }
}

/**
 * Verifies a Firebase id token.
 *
 * @param {string} id_token - id token to verify
 * @returns {Promise<string | object>} promise containing the uid from validated
 * token or error object if token was invalid
 */
export const verify_token = async id_token => {
  try {
    return (await FIREBASE_AUTH.verifyIdToken(id_token)).uid
  } catch (error) {
    return throw_error({
      status: 401, message: 'Please provide a valid UID token.'
    })
  }
}
