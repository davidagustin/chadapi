/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

// packages
import { BadRequest } from '@feathersjs/errors'
import { read_database } from '@flexdevelopment/utilities'

// config
import { USERS_SERVICE } from '../../config/feathers.config'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../../config/firebase.config'

// user service components
import { NEW_USER } from './User.schema'

// utiltity functions
import { validate_schema } from '../../utilities'

/**
 * Class representing the user service.
 *
 * @class User
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class User {
  /**
   * This function takes a piece of user data as an argument and validates it
   * against the new user schema. If the data as a whole is valid, the username
   * will be checked. If schema is invalid or the username is invalid, an error
   * will be thrown.
   *
   * @async
   * @param {object} data - new user data to validate
   * @returns {object} if data is valid
   * @throws {BadRequest} if user data doesn't match new user schema
   */
  static async validate(data) {
    console.info('Validating user data...')

    // validate user data as a whole
    try {
      data = validate_schema(data, NEW_USER)
      console.info('User data as a whole valid. Checking username...')
    } catch (error) {
      throw error
    }

    // validate username
    let options = {
      database: FIREBASE_DATABASE,
      location: '/users',
      filter: { property: 'username', value: data.username }
    }

    let read = await read_database(options)
    if (!read.ok) throw new Error(read.message)
    if (read.data.length) throw new BadRequest('Username in use.')

    console.info('All user data is valid.')
    return data
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
   * This function takes a user id and query parameters to search for the user
   * if the uid is unknown and returns a success object containing the requested
   * user.
   *
   * @async
   * @param {string} id - uid of user to get
   * @param {object} params - query parameters to find the user
   * @returns {object} success object containing requested user data
   */
  async get(id, params) {
    if (params) {
      return USERS_SERVICE.find({ query: params })
    } else if (id) {
      return USERS_SERVICE.find({ query: { type: 'uid', identifier: id } })
    }
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
  async create(data, params) {
    if (data) {
      console.info('Attempting to insert user data into the database...')

      try {
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
    } else {
      return success({
        status: 204, message: 'No data to insert into database.'
      })
    }
  }

  /**
   * This function normally updates an existing user by overwriting all of their
   * existing data. For BoomitArts, however, this route is unimplemented and
   * returns an error object regardless of the arguments passed in.
   *
   * @param {string} id - uid of user to update
   * @param {object} data - new user data
   * @param {object} params - query parameters to find the user
   * @returns {object} error object
   */
  update(id, data, params) {
    return throw_error({ status: 501, message: 'Overwriting user data is not allowed. If you wish to update a user, please send a PATCH request.' })
  }

  /**
   * This function takes a user id. a piece of data, and a object containing a
   * user field to update. If the data is valid, the current user data will be
   * updated.
   *
   * @async
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
   * @async
   * @param {string} id - uid of user to delete
   * @param {object} params - query parameters to search for the user
   * @returns {object} success object if user account was deleted
   */
  async remove(id, params) {
    try {
      // TODO: use if params is non-null, search for user based params

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
