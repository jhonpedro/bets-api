'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  static get hidden() {
    return ['is_deactivated']
  }
}

module.exports = Game
