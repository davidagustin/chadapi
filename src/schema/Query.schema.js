// packages
import { JOI } from '../config/app.config'

/**
 * Query schema
 *
 * @file Manages schema for queries
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const USER_QUERY = JOI.object().keys({
  type: JOI.string().valid(['c_id', 'email', 'uid', 'username', null]),
  identifier: JOI.string().allow(null)
})

export default USER_QUERY
