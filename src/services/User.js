/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */

// packages
import dotenv from 'dotenv'
import { BadRequest } from '@feathersjs/errors'

// config
import { ROUTES } from '../config/app.config'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../config/firebase.config'

// schema
import { NEW_USER } from '../schema'

// utiltity functions
import { read, success, throw_error, validate_schema } from '../utilities'

// configure environment variables
dotenv.config()

const { SLACK_WEBHOOK_URL } = process.env

/**
 * Class representing the user service.
 *
 * @class Organization
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class User {
  /**
   * This function takes an object and validates it against the new user schema.
   *
   * @param {object} data
   * @returns {void} if data is valid
   */
  static validate(data) {
    data = validate_schema(data, NEW_USER)

    if (data.chad) return data

    // general user data has been validated. need to check the username
    let username = data.username
    try {
      data.username = User.validate_username(data.username)
    } catch (error) {
      throw new BadRequest(error.messsage)
    }

    console.log('Data valid.')
    return data
  }

  /**
   * This function takes a username as an argument and checks if the username is
   * available. If so, the username is returned. Otherwise, an error is thrown.
   *
   * @async
   * @param {string} username - username to validate
   * @returns {void} if username is valid
   * @throws {BadRequest} if username is invalid or taken
   */
  static async validate_username(username) {
    if (!username || !username.trim().length) {
      throw new BadRequest('Usernames are required')
    }

    username = username.trim()

    // check if username is in use
    let users = await read({
      location: '/users',
      filter: { type: 'username', identifier: username }
    })

    if (!users.ok) {
      let message = `Error retreiving users while attempting to validate username: ${users.message}`

      console.error(message)
      throw new BadRequest(message)
    }

    users.data = users.data.find(u => u.username === username ? u : null)

    // throw an error if the username is in use
    if (users.data) {
      let message = 'Username in use.'
      console.error(message)
      throw new BadRequest(message)
    }

    console.info('Username valid.')

    return username
  }

  /**
   * Creates a new user. The data has already been validated and the user's data
   * has already been registered in Firebase by the user service hook.
   *
   * @async
   * @param {object} data - new user data
   * @param {object} params - query parameters
   * @returns {object} success object if user data was inserted into the
   * database
   */
  async create(data, params = {}) {
    try {
      console.info('Attempting to insert user data into the database...')

      await FIREBASE_DATABASE.ref('/users').child(data.uid).set(data)

      console.info('Inserted user into database.')

      return success({
        status: 201,
        message: 'Created new Firebase user and inserted user into database.',
        data: data
      })
    } catch (error) {
      await FIREBASE_AUTH.deleteUser(data.uid)

      console.error('Error inserting user into database. Deleted Firebase Authentication profile: ', error.message)

      return throw_error({
        status: 502,
        message: `Error inserting user into database: ${error.message}`
      })
    }
  }

  /**
   * Returns all users, possibly matching the query argument.
   *
   * @async
   * @param {object} query - query parameters
   * @returns {object} success object if data was found
   */
  async find(params) {
    let users = await read({ location: '/users', filter: params.query })

    if (!users.ok) {
      let error_messsage = `Error retreiving users during User.find() service method: ${users.message}`

      console.error(error_messsage)
      throw new BadRequest(error_messsage)
    }

    console.info('Retreived users:\n', users)
    console.log('\n')

    return users
  }

  /**
   * This function takes a user id. a piece of data, and a object containing a
   * user field to update. If the data is valid, the current user data will be
   * updated.
   *
   * @param {string} id - uid of user to update
   * @param {*} data - new data
   * @param {*} params - object containing fields to update
   * @returns {object} success object if user data was updated
   */
  async patch(id, data, params) {
    return throw_error({ status: 501, message: 'Route handler under construction.' })
  }

  /**
   * This function takes the uid of user and parameters to search for a user if
   * the uid is unknown. If the user is found, their account will be deleted.
   *
   * @param {string} id - uid of user to delete
   * @param {object} params - query parameters to search for the user
   * @returns {object} success object if user account was deleted
   */
  async remove(id, params) {
    try {
      await FIREBASE_DATABASE.ref(`/users/${id}`).remove()

      console.info('Deleted Firebase user.', { uid: id })

      return success({
        status: 204,
        message: 'Deleted Firebase user.',
        data: { uid: id }
      })
    } catch (error) {
      return throw_error({
        status: 502,
        message: `Error removing user data in database: ${error.message}`
      })
    }
  }
}
