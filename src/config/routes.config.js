// config
import { FEATHERS_APP } from './feathers.config'
import { ROUTES } from './app.config'

/**
 * @file Route configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

FEATHERS_APP.all('*', async (req, res, next) => {
  console.info('Received request for Chad API at', req.path)
  return next()
})

FEATHERS_APP.all('/', async (req, res, next) => {
  return res.redirect(ROUTES.base)
})

FEATHERS_APP.all(ROUTES.base, async (req, res, next) => {
  return res.sendFile('index.html', { root: 'public' })
})

FEATHERS_APP.all(ROUTES.api, async (req, res, next) => {
  // TODO: serve api documentation
  res.send('Welcome to the Chad API!')
})

export default FEATHERS_APP
