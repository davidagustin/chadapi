/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

// packages
import { BadRequest } from '@feathersjs/errors'

// config
import { ROUTES } from '../config/app.config'
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '../config/firebase.config'

// schema
import { USER_QUERY } from '../schema'

// services
import { User } from '../services'

// modules
import {
  create_firebase_user, throw_error, validate_schema
} from '../utilities'

/**
 * @file User service hooks
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const USER_HOOKS = {
  before: {
    async create(context) {
      // log the request
      console.info(`Received POST request for ${ROUTES.users.all}.\n`)

      let data_copy = Object.assign({}, context.data)

      // validate user data as a whole
      console.log('Validating user data...')

      let valid = User.validate(data_copy)
      if (valid.boomitarts) {
        console.error(`Invalid user data: `, valid)
        throw new BadRequest(valid.message)
      }

      // create a new firebase user, then attach uid to context
      try {
        context.data = await create_firebase_user(data_copy)

        /*
         * TODO: create storage ref
         * new user is assumed to be created, and sensitive data has been
         * removed from context.data in create_firebase_user
         */
        // context.data.storage_ref = `/users/${new_user.uid}`
        // FIREBASE_STORAGE.bucket(data_copy.storage_ref)

        return context
      } catch (error) {
        throw new BadRequest(JSON.stringify(error.message))
      }
    },
    async find(context) {
      // log the request
      console.info(`Received GET request for ${ROUTES.users.all}.\n`)

      // check for a query to validate
      console.log('Validating query...')
      try {
        context.params.query = validate_schema(context.params.query, USER_QUERY)
      } catch (error) {
        throw new BadRequest(JSON.stringify(throw_error({
          status: 400, messsage: error.messsage
        })))
      }

      console.info(`Query valid: `, context.params.query)
      console.log('\n')

      return context
    }
  }
}

export default USER_HOOKS
