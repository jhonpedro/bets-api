'use strict'

class Session {
  get rules() {
    return {
      email: 'required|email|exists:users,email',
      password: 'required',
    }
  }
}

module.exports = Session
