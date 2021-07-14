'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AppException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle() {}
}

module.exports = AppException
