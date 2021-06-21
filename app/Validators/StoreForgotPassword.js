'use strict'

class StoreForgotPassword {
  get rules() {
    return {
      email: 'required|email',
      redirect_url: 'required|url',
    }
  }
}

module.exports = StoreForgotPassword
