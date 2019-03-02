/* eslint-disable camelcase */

// packages
import { JOI } from '../config/app.config'

// modules
import { throw_error } from '../utilities'

/**
 * @file Manages user schema
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const STRING = JOI.string().min(1)
const PASSWORD = JOI.string().min(6)
const URL = JOI.string().uri().allow(null)

const NEW_USER = JOI.object().keys({
  display_name: JOI.object().keys({
    first: STRING.required().error(() => {
      return throw_error({ status: 400, message: 'First names must be at least one character.' })
    }),
    last: STRING.allow(null).required().error(() => {
      return throw_error({ status: 400, message: 'Last names must be at least one character or null.' })
    })
  }).required(),
  email: JOI.string().email().required().error(() => {
    return throw_error({
      status: 400, message: 'Email addresses are required.'
    })
  }),
  username: STRING.required().error(() => {
    return throw_error({ status: 400, message: 'Usernames are required and must be at least one character.' })
  }),
  password: PASSWORD.required().error(() => {
    return throw_error({ status: 400, message: 'Passwords must be at least six characters.' })
  }),
  c_password: JOI.string().valid(JOI.ref('password')).required().error(() => {
    return throw_error({ status: 400, message: 'Passwords do not match.' })
  }),
  bio: JOI.string().max(280).allow(null).required(() => {
    return throw_error({ status: 400, message: 'Invalid bio. Bios must be maximum 280 characters or null.' })
  })
}).required()

export { STRING, PASSWORD, URL, NEW_USER }
