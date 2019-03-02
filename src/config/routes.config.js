// config
import { FEATHERS_APP } from './feathers.config'
import { ROUTES } from './app.config'

/**
 * @file Route configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

FEATHERS_APP.all(ROUTES.base, async (req, res, next) => {
  res.send('Welcome to the Chad API!<br />Go to <code>/api/v1</code> to begin reading data.')
})

FEATHERS_APP.all(ROUTES.api, async (req, res, next) => {
  res.send('Welcome to the Chad API!')
})

export default FEATHERS_APP
