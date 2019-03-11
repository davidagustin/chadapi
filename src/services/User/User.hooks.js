/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

// packages
import { BadRequest } from '@feathersjs/errors'
import moment from 'moment'

// config
import { ROUTES } from '../../config/app.config'

// user service components
import { USER_QUERY } from './User.schema'
import { User } from './User.model'

// modules
import {
  create_firebase_user, throw_error, validate_schema
} from '../../utilities'

/**
 * @file User service hooks
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const USER_HOOKS = {
  before: {
    async create(context) {
      // log the request
      console.info(`Received POST request for ${ROUTES.users.all}.\n`)

      try {
        // validate user data
        context.data = await User.validate(context.data)

        // create a new firebase user, then attach uid to context
        context.data = await create_firebase_user(context.data)

        /*
         * new user is assumed to be created, and sensitive data has been
         * removed from context.data in create_firebase_user
         */
        const DATE = 'MM/DD/YYYY'
        context.data.birthday = moment(context.data.birthday).format(DATE)

        return context
      } catch (error) {
        throw error
      }
    },
    async find(context) {
      // log the request
      console.info(`Received GET request for ${ROUTES.users.all}.\n`)

      // validate query
      console.log('Validating query...')
      try {
        context.params.query = validate_schema(context.params.query, USER_QUERY)
      } catch (error) {
        throw new BadRequest(JSON.stringify(throw_error({
          status: 400, messsage: error.messsage
        })))
      }

      console.info(`Query valid: `, context.params.query)

      return context
    }
  }
}

export default USER_HOOKS
