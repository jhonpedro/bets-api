'use strict'

class UpdateForgotPassword {
  get rules() {
    return {
      password: 'required|confirmed',
    }
  }
}

module.exports = UpdateForgotPassword
