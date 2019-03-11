/* eslint-disable camelcase */

// packages
import { Joi } from 'celebrate'
import { BadRequest } from '@feathersjs/errors'

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
      throw new BadRequest('First names must be at least one character.')
    }),
    last: STRING.allow(null).required().error(() => {
      throw new BadRequest('Last names must be at least one character or null.')
    })
  }).required(),
  birthday: Joi.date().max('now').required().error(() => {
    throw new BadRequest('Birthdays are required. The youngest birthday allowed is today.')
  }),
  gender_identity: Joi.string().valid(GENDER_OPTIONS).required().error(() => {
    throw new BadRequest(`Gender identity is required and must be one of the following options: ${GENDER_OPTIONS}`)
  }),
  email: Joi.string().email().required().error(() => {
    throw new BadRequest('Email addresses are required.')
  }),
  username: STRING.required().error(() => {
    throw new BadRequest('Usernames are required and must be at least one character.')
  }),
  password: PASSWORD.required().error(() => {
    throw new BadRequest('Passwords must be at least six characters.')
  }),
  c_password: Joi.string().valid(Joi.ref('password')).required().error(() => {
    throw new BadRequest('Passwords do not match.')
  }),
  bio: Joi.string().max(280).allow(null).required().error(() => {
    throw new BadRequest('Bios must be maximum 280 characters or null.')
  })
}).required()

const USER_UPDATE_OPTIONS = Joi.object().keys({
  display_name: Joi.object().keys({
    first: STRING.error(() => {
      throw new BadRequest('First names must be at least one character.')
    }),
    last: STRING.allow(null).error(() => {
      throw new BadRequest('Last names must be at least one character or null.')
    })
  }),
  birthday: Joi.date().max('now').error(() => {
    throw new BadRequest('Birthdays are required. The youngest birthday allowed is today.')
  }),
  gender_identity: Joi.valid(GENDER_OPTIONS).error(() => {
    throw new BadRequest(`Gender identity is required and must be one of the following options: ${GENDER_OPTIONS}`)
  }),
  email: Joi.string().email().error(() => {
    return throw_error({
      status: 400, message: 'Email addresses are required.'
    })
  }),
  username: STRING.error(() => {
    throw new BadRequest('Usernames are required and must be at least one character.')
  }),
  password: PASSWORD.error(() => {
    throw new BadRequest('Passwords must be at least six characters.')
  }),
  bio: Joi.string().max(280).allow(null).error(() => {
    throw new BadRequest('Bios must be maximum 280 characters or null.')
  })
}).required()

const USER_QUERY = Joi.object().keys({
  property: Joi.string().valid(['c_id', 'email', 'uid', 'username', null])
    .error(() => {
      throw new BadRequest('Invalid user search property. Propety must be c_id, email, uid, or username.')
    }),
  value: Joi.string().allow(null)
})

export { STRING, PASSWORD, URL, NEW_USER, USER_UPDATE_OPTIONS, USER_QUERY }
