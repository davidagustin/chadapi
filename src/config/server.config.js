/* eslint-disable camelcase */

// packages
import dotenv from 'dotenv'

// config
import FEATHERS_APP from './routes.config'

/**
 * @file Manages server listening sequence and exposure of Cloud functions
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// configure environment variables
dotenv.config()

const { NODE_ENV, PORT } = process.env

// start the server
const SERVER = FEATHERS_APP

if (NODE_ENV === 'development') {
  SERVER.listen(PORT)

  SERVER.on('listening', () => {
    console.info(`Server ready at http://localhost:${PORT}`)
  })
}

export default SERVER
