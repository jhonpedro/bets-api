'use strict'

const Antl = use('Antl')

class StorePurchase {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      bets: 'required|array|min:1',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = StorePurchase
