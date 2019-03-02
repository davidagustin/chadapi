// packages
import { JOI } from '../config/app.config'

/**
 * @file Manages schema for responses
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const ResponseMessage = JOI.string().min(1).required()

const ERROR_RESPONSE = JOI.object().keys({
  status: JOI.number()
    .valid(400, 401, 402, 403, 404, 405, 500, 501, 502).required(),
  message: ResponseMessage
})

const SUCCESS_RESPONSE = JOI.object().keys({
  status: JOI.number().valid(200, 201, 203, 204).required(),
  message: ResponseMessage,
  data: JOI.any().allow(null)
})

export { ERROR_RESPONSE, SUCCESS_RESPONSE }
