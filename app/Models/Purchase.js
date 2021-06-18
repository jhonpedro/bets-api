'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Purchase extends Model {
  static boot() {
    super.boot()

    this.addHook('afterCreate', 'NewPurchaseHook.NewPurchaseMail')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  bets() {
    return this.hasMany('App/Models/Bet')
  }
}

module.exports = Purchase
