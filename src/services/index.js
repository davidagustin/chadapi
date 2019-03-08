// packages
import dotenv from 'dotenv'

/**
 * @file Manages the application services and accompanying schema and hooks
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// configure environment variables
dotenv.config()

// schema
export {
  STRING, PASSWORD, URL, NEW_USER, USER_UPDATE_OPTIONS, USER_QUERY
} from './User/User.schema'

// hooks
export APPLICATION_HOOKS from './App/App.hooks'
export USER_HOOKS from './User/User.hooks'

// service models
export User from './User/User.model'
