'use strict'

const formatNumbersCSVToNumbersArr = require('../../../util/formatNumbersCSVToNumbersArr')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database')

/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ auth }) {
    const bets = await Database.table('bets')
      .select(
        'bets.id',
        'games.type',
        'games.color',
        'games.price',
        'bets.numbers',
        'purchases.created_at'
      )
      .innerJoin('purchases', 'bets.purchase_id', 'purchases.id')
      .innerJoin('games', 'bets.game_id', 'games.id')
      .where('purchases.user_id', auth.user.id)
      .orderBy('bets.created_at', 'desc')

    return bets.map((bet) => ({
      ...bet,
      numbers: formatNumbersCSVToNumbersArr(bet.numbers),
    }))
  }
}

module.exports = BetController
