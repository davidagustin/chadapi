/* eslint-disable camelcase */

// packages
import { BadRequest } from '@feathersjs/errors'

// config
import { FIREBASE_AUTH } from '../config/firebase.config'

// services
import { User } from '../services'

// test modules
import { USER_HOOKS } from '../hooks'

// utility functions
import { cleanup_unit_tests } from '../utilities'

/**
 * @file User service hook unit tests
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Tests that user data is properly validated before passed into User.find.
 */
test('an error is thrown when user data is invalid', async () => {
  let user = {
    display_name: {
      first: null,
      last: 'Drumgold'
    },
    email: 'lexusdrumgold@gmail.com',
    username: 'lex',
    password: 'securepassword',
    c_password: 'securepassword',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel eleifend enim, a faucibus velit. Nulla iaculis sapien ac nisi porttitor, ac aliquet tellus tempor. Ut eu fermentum tortor. Duis facilisis sollicitudin ex. Pellentesque consequat velit nec turpis mattis nullam.'
  }

  // invalid display name error
  try {
    console.warn('Attempting to create user with invalid display name...')
    await USER_HOOKS.before.create({ data: user })
  } catch (error) {
    expect(error).toBeInstanceOf(BadRequest)
  }

  user.display_name.first = 'Lexus'
  user.username = ''

  // invalid username error
  try {
    console.warn('Attempting to create user with invalid username...')
    await USER_HOOKS.before.create({ data: user })
  } catch (error) {
    expect(error).toBeInstanceOf(BadRequest)
  }

  user.username = 'lex'
  user.c_password = 'securepass'

  // invalid passwords error
  try {
    console.warn('Attempting to create user with invalid passwords...')
    await USER_HOOKS.before.create({ data: user })
  } catch (error) {
    expect(error).toBeInstanceOf(BadRequest)
  }
})

/**
 * Tests that a Firebase user is created.
 */
test('a firebase user is created by the user service hook', async () => {
  let user = {
    display_name: {
      first: 'Lexus',
      last: 'Drumgold'
    },
    email: 'lexusdrumgold@gmail.com',
    username: 'lex',
    password: 'securepassword',
    c_password: 'securepassword',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel eleifend enim, a faucibus velit. Nulla iaculis sapien ac nisi porttitor, ac aliquet tellus tempor. Ut eu fermentum tortor. Duis facilisis sollicitudin ex. Pellentesque consequat velit nec turpis mattis nullam.'
  }

  console.warn('Attempting to create new user...')

  user = await USER_HOOKS.before.create({ data: user })
  let data = user.data

  console.info('Created new user:\n', user)
  await FIREBASE_AUTH.deleteUser(data.uid)

  expect(data.username).toBe('lex')
})

/**
 * Tests that a Firebase user is created and their data is inserted into the
 * database.
 */
test('a firebase user is created and user data entry is created', async () => {
  let user = {
    display_name: {
      first: 'Lexus',
      last: 'Drumgold'
    },
    email: 'lexusdrumgold@gmail.com',
    username: 'lex',
    password: 'securepassword',
    c_password: 'securepassword',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel eleifend enim, a faucibus velit. Nulla iaculis sapien ac nisi porttitor, ac aliquet tellus tempor. Ut eu fermentum tortor. Duis facilisis sollicitudin ex. Pellentesque consequat velit nec turpis mattis nullam.'
  }

  console.warn('Attempting to create new Firebase user...')
  user = await USER_HOOKS.before.create({ data: user })
  expect(user.data.username).toBe('lex')
  console.info('Created new Firebase user:\n', user)

  console.warn('Attempting to insert user into database...')
  user = await (new User()).create(user.data)
  expect(user.status).toBe(201)
  console.info('Inserted user into database:\n', user)

  await cleanup_unit_tests(user.data.uid)
})
