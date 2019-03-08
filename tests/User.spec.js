/* eslint-disable camelcase */

// packages
import { BadRequest } from '@feathersjs/errors'

// mocks
import * as UserMocks from './__mocks__/User.mock.json'

// test modules
import { USER_HOOKS, User } from '../src/services'

// utility functions
import { cleanup_unit_tests } from '../src/utilities'

/**
 * @file User service hook unit tests
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

describe('user service', () => {
  // tests user is not created if display name is invalid
  describe('USER_HOOKS.before.create', () => {
    it('should not create a user when display name is invalid.', async () => {
      let user = JSON.parse(UserMocks.invalid_display_name)

      try {
        console.warn('Attempting to create user with invalid display name...')
        expect(await USER_HOOKS.before.create({ data: user })).toBe(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest)
      }
    })
  })

  // tests user is not created if username is invalid
  describe('USER_HOOKS.before.create', () => {
    it('should not create a user when username is invalid.', async () => {
      let user = JSON.parse(UserMocks.invalid_username)

      try {
        console.warn('Attempting to create user with invalid username...')
        expect(await USER_HOOKS.before.create({ data: user })).toBe(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest)
      }
    })
  })

  // tests user is not created if passwords don't match
  describe('USER_HOOKS.before.create', () => {
    it('should not create a user if passwords don`t match', async () => {
      let user = JSON.parse(UserMocks.invalid_passwords)

      try {
        console.warn('Attempting to create user with invalid passwords...')
        expect(await USER_HOOKS.before.create({ data: user })).toBe(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequest)
      }
    })
  })

  // tests user is created
  describe('USER_HOOKS.before.create + User.create()', () => {
    it('should create a user', async () => {
      let user = JSON.parse(UserMocks.valid)

      console.warn('Attempting to create new Firebase user...')
      user = await USER_HOOKS.before.create({ data: user })
      expect(user).toBeInstanceOf(Object)
      expect(user.data.username).toBe('lex')
      console.info('Created new Firebase user:\n', user)

      console.warn('Attempting to insert user into database...')
      user = await (new User()).create(user.data)
      expect(user.status).toBe(201)
      console.info('Inserted user into database:\n', user)

      await cleanup_unit_tests(user.data.uid)
    })
  })
})
