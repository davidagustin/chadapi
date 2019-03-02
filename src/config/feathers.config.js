// packages
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'

// config
import { ROUTES } from './app.config'

// services
import { User } from '../services'

// hooks
import { APPLICATION_HOOKS, USER_HOOKS } from '../hooks'

/**
 * @file Server configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/*
 * Below we set configure our application.
 *
 * 1) initialize feathers application
 * 2) turn on JSON body parsing for REST services
 * 3) turn on URL-encoded body parsing for REST services
 * 4) set up REST transport using Express
 * 5) configure socket.io transport
 * 6) configure services
 * 7) add error handler
 */

const FEATHERS_APP = express(feathers())

FEATHERS_APP.use(express.json())
FEATHERS_APP.use(express.urlencoded({ extended: true }))
FEATHERS_APP.configure(express.rest())
FEATHERS_APP.configure(socketio())
FEATHERS_APP.use(ROUTES.users, new User())
FEATHERS_APP.use(express.errorHandler())

// initialize services
const USERS_SERVICE = FEATHERS_APP.service(ROUTES.users)

// add hooks
FEATHERS_APP.hooks(APPLICATION_HOOKS)
USERS_SERVICE.hooks(USER_HOOKS)

export { FEATHERS_APP, USERS_SERVICE }
