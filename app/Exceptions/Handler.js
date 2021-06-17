'use strict'

const Env = use('Env')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (error.name === 'InvalidJwtToken') {
      return response.status(400).send([{ message: error.message }])
    }

    if (error.name === 'ModelNotFoundException') {
      return response.status(404).send([{ message: 'Not found' }])
    }

    if (Env.get('NODE_ENV', '') === 'development') {
      process.stderr.write(`${error}\n`)
      return response.status(500).send('look the console')
    }

    return response
      .status(500)
      .send({ error: 'an error occurred on the server, try again later' })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  // async report(error, { request }) {}
}

module.exports = ExceptionHandler
