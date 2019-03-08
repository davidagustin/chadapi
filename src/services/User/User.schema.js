/* eslint-disable camelcase */

// packages
import { Joi } from 'celebrate'

// config
import { GENDER_OPTIONS } from '../../config/app.config'

// modules
import { throw_error } from '../../utilities'

/**
 * @file Manages user schema
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const STRING = Joi.string().min(1)
const PASSWORD = Joi.string().min(6)
const URL = Joi.string().uri().allow(null)

const NEW_USER = Joi.object().keys({
  display_name: Joi.object().keys({
    first: STRING.required().error(() => {
      return throw_error({ status: 400, message: 'First names must be at least one character.' })
    }),
    last: STRING.allow(null).required().error(() => {
      return throw_error({ status: 400, message: 'Last names must be at least one character or null.' })
    })
  }).required(),
  birthday: Joi.date().max('now').required().error(() => {
    return throw_error({
      status: 400,
      message: 'Birthdays are required. The youngest birthday allowed today.'
    })
  }),
  gender_identity: Joi.string().valid(GENDER_OPTIONS).required().error(() => {
    return throw_error({
      status: 400, message: `Gender identity is required and must be one of the following options: ${GENDER_OPTIONS}`
    })
  }),
  email: Joi.string().email().required().error(() => {
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
  c_password: Joi.string().valid(Joi.ref('password')).required().error(() => {
    return throw_error({ status: 400, message: 'Passwords do not match.' })
  }),
  bio: Joi.string().max(280).allow(null).required().error(() => {
    return throw_error({ status: 400, message: 'Bios must be maximum 280 characters or null.' })
  })
}).required()

const USER_UPDATE_OPTIONS = Joi.object().keys({
  display_name: Joi.object().keys({
    first: STRING.error(() => {
      return throw_error({ status: 400, message: 'First names must be at least one character.' })
    }),
    last: STRING.allow(null).error(() => {
      return throw_error({ status: 400, message: 'Last names must be at least one character or null.' })
    })
  }),
  birthday: Joi.date().max('now').error(() => {
    return throw_error({
      status: 400,
      message: 'Birthdays are required. The youngest birthday allowed today.'
    })
  }),
  gender_identity: Joi.valid(GENDER_OPTIONS).error(() => {
    return throw_error({
      status: 400, message: `Gender identity is required and must be one of the following options: ${GENDER_OPTIONS}`
    })
  }),
  email: Joi.string().email().error(() => {
    return throw_error({
      status: 400, message: 'Email addresses are required.'
    })
  }),
  username: STRING.error(() => {
    return throw_error({ status: 400, message: 'Usernames are required and must be at least one character.' })
  }),
  password: PASSWORD.error(() => {
    return throw_error({ status: 400, message: 'Passwords must be at least six characters.' })
  }),
  bio: Joi.string().max(280).allow(null).error(() => {
    return throw_error({ status: 400, message: 'Bios must be maximum 280 characters or null.' })
  })
}).required()

const USER_QUERY = Joi.object().keys({
  type: Joi.string().valid(['c_id', 'email', 'uid', 'username', null]),
  identifier: Joi.string().allow(null)
})

export { STRING, PASSWORD, URL, NEW_USER, USER_UPDATE_OPTIONS, USER_QUERY }
