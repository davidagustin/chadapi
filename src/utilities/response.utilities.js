/* eslint-disable camelcase */

/**
 * @file A set of response utility functions for throwing errors and handling
 * successful server operations.
 * @module ResponseUtilities
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Returns a success object.
 *
 * @param {object} success_obj - success object
 * @param {boolean} success_obj.ok - true
 * @param {number} success_obj.status - status code. 200, 201, or 204
 * @param {string} success_obj.message - descriptive success message
 * @param {*} success_obj.data - data to return if any
 * @returns {success}
 * @throws {Error} stringified version error
 */
export const success = success_obj => {
  const { status, message, data } = success_obj

  success_obj = ok(message, data)

  if (status === 201) success_obj = created(message, data)
  if (status === 204) success_obj = no_content(message, data)

  return success_obj
}

/**
 * Throws a stringified version of an error provided the error object is
 * the correct schema.
 *
 * @param {object} error - error object
 * @param {number} error.status - status code. 400, 401, 402, 403, 404, 405,
 * 500, 501, or 502
 * @param {string} error.message - descriptive error message
 * @returns {void}
 * @throws {Error} stringified version error
 */
export const throw_error = error => {
  const { status, message } = error

  error = internal_server(message)

  if (status === 400) error = bad_request(message)
  if (status === 401) error = unauthorized(message)
  if (status === 402) error = payment_required(message)
  if (status === 403) error = forbidden(message)
  if (status === 404) error = not_found(message)
  if (status === 405) error = method_not_allowed(message)
  if (status === 501) error = not_implemented(message)
  if (status === 502) error = bad_gateaway(message)

  return error
}

/**
 * Creates a 201 Created success response. The request has succeeded and a new
 * resource has been created as a result of it. This is typically the response
 * sent after a POST request, or after some PUT requests.
 *
 * @param {string} message - descriptive error message
 * @param {*} data - data to return if any
 * @return {object} error object matching ErrorResponse
 */
const created = (message, data) => {
  return new_success(201, 'Created', message, data)
}

/**
 * Creates a 502 Bad Gateway error. This error response means that the server,
 * while working as a gateway to get a response needed to handle the request,
 * got an invalid response.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const bad_gateaway = message => {
  return new_error(502, 'Bad Gateway', message)
}

/**
 * Creates a 400 Bad Request error. This response means that server could not
 * understand the request due to invalid syntax.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const bad_request = message => {
  return new_error(400, 'Bad Request', message)
}

/**
 * Creates a 403 Forbidden error. The client does not have access rights to the
 * content, i.e. they are unauthorized, so server is rejecting to give proper
 * response. Unlike 401, the client's identity is known to the server.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const forbidden = message => {
  return new_error(403, 'Forbidden', message)
}

/**
 * Creates a 500 Internal Server error. The server has encountered a situation
 * it doesn't know how to handle.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const internal_server = message => {
  return new_error(500, 'Internal Server Error', message)
}

/**
 * Creates a 405 Method Not Allowed error. The request method is known by the
 * server but has been disabled and cannot be used. For example, an API may
 * forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must
 * never be disabled and should not return this error code.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const method_not_allowed = message => {
  return new_error(405, 'Method Not Allowed', message)
}

/**
 * Creates a new error object.
 *
 * @param {number} status - status code of error
 * @param {string} error_title - client error response
 * @param {string} message - descriptive error message
 * @returns {object}  error object matching ErrorResponse
 */
const new_error = (status, error_title, message) => {
  return {
    ok: false,
    chad: true,
    status: status,
    error: error_title,
    message: message
  }
}

/**
 * Creates a new success object.
 *
 * @param {number} status - status code of error
 * @param {string} success_title - success response
 * @param {string} message - descriptive error message
 * @param {*} data - new data to return to client, if any
 * @returns {object}  error object matching SuccessResponse
 */
const new_success = (status, success_title, message, data) => {
  return {
    ok: true,
    status: status,
    success: success_title,
    message: message,
    data: data
  }
}

/**
 * Creates a 204 No Content success response. The request has succeeded
 * and a new resource has been created as a result of it. This is typically the
 * response sent after a POST request, or after some PUT requests.
 *
 * @param {string} message - descriptive error message
 * @param {*} data - data to return if any
 * @return {object} error object matching ErrorResponse
 */
const no_content = (message, data) => {
  return new_success(204, 'No Content', message, data)
}

/**
 * Creates a 404 Not Found error. The server can not find requested resource. In
 * the browser, this means the URL is not recognized. In an API, this can also
 * mean that the endpoint is valid but the resource itself does not exist.
 * Servers may also send this response instead of 403 to hide the existence of a
 * resource from an unauthorized client. This response code is probably the most
 * famous one due to its frequent occurence on the web.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const not_found = message => {
  return new_error(404, 'Not Found', message)
}

/**
 * Creates 501 Not Implemented error. The request method is not supported by the
 * server and cannot be handled. The only methods that servers are required to
 * support (and therefore that must not return this code) are GET and HEAD.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const not_implemented = message => {
  return new_error(501, 'Not Implemented', message)
}

/**
 * Creates a 200 OK success response. The request has succeeded. The meaning of
 * a success varies depending on the HTTP method.
 *
 * @param {string} message - descriptive error message
 * @param {*} data - data to return if any
 * @return {object} error object matching ErrorResponse
 */
const ok = (message, data) => {
  return new_success(200, 'Success', message, data)
}

/**
 * Creates a 402 Payment Required error. This response code is reserved for
 * future use. Initial aim for creating this code was using it for digital
 * payment systems however this is not used currently.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const payment_required = message => {
  return new_error(402, 'Payment Required', message)
}

/**
 * Creates a 401 Unauthorized error. Although the HTTP standard specifies
 * "unauthorized", semantically this response means "unauthenticated". That is,
 * the client must authenticate itself to get the requested response.
 *
 * @param {string} message - descriptive error message
 * @return {object} error object matching ErrorResponse
 */
const unauthorized = message => {
  return new_error(401, 'Unauthorized', message)
}
