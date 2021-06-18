'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bet extends Model {
  purchases() {
    return this.belongsTo('App/Model/Purchase')
  }

  game() {
    return this.belongsTo('App/Models/Game')
  }
}

module.exports = Bet
