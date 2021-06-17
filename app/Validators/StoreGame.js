'use strict'

class StoreGame {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      type: 'required',
      description: 'required',
      range: 'required|integer|above:0',
      price: 'required|number|above:0',
      max_number: 'required|integer',
      color: 'required',
      min_cart_value: 'required|number',
      is_deactivated: 'boolean',
    }
  }

  get sanitizationRules() {
    return {
      description: 'strip_tags',
    }
  }
}

module.exports = StoreGame
