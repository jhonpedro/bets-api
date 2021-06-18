'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {Array.<{type: string, game_id: number, numbers: Array.<number>, price: number}>} Bets */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')
const Purchase = use('App/Models/Purchase')
const Game = use('App/Models/Game')

/**
 * Resourceful controller for interacting with purchases
 */
class PurchaseController {
  constructor() {
    this.possibleGames = { rows: [] }
  }

  /**
   * Show a list of all purchases.
   * GET purchases
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ auth }) {
    const { user } = auth

    const purchases = await Purchase.query()
      .where('user_id', user.id)
      .with('bets.game')
      .fetch()

    return purchases
  }

  /**
   * Create/save a new purchase.
   * POST purchases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const betsInput = request.input('bets')
    const { user } = auth

    const isValid = await this.validateBets(betsInput)

    if (isValid.length > 0) {
      return response.status(400).send(isValid)
    }

    const trx = await Database.beginTransaction()

    try {
      const priceTotal = this.getBetsTotalPrice(betsInput)

      const purchase = await Purchase.create(
        { user_id: user.id, price_total: priceTotal },
        trx
      )

      const bets = await purchase.bets().createMany(
        betsInput.map((bet) => ({
          game_id: bet.game_id,
          numbers: bet.numbers.join(';'),
          purchase_id: purchase.id,
        })),
        trx
      )

      await trx.commit()

      return bets
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  /**
   * Validates with the methods provided the bets
   *
   * @param {Bets} bets
   * @returns {Array}
   */
  async validateBets(bets) {
    await this.startPossibleGames(bets)

    const validateGame = await this.validateIfGamesExistsInDatabaseByGameId(
      bets
    )
    const validateBetsRange = this.validateBetsRangeAndMaxNumber(bets)

    return [...validateGame, ...validateBetsRange]
  }

  /**
   * Search in games for the existence of game_id provided in
   * the array param
   *
   * @param {Bets} bets
   * @returns {Array}
   */
  async validateIfGamesExistsInDatabaseByGameId(bets) {
    const isValid = bets.reduce((acc, bet, index) => {
      if (
        this.possibleGames.rows.some(
          (possibleBet) =>
            possibleBet.type === bet.type && possibleBet.id === bet.game_id
        )
      ) {
        return acc
      }

      return [
        {
          message: `Game id ${bet.game_id} mismatch with ${bet.type} in index ${index}`,
        },
        ...acc,
      ]
    }, [])

    return isValid
  }

  /**
   *
   * @param {Bets} bets
   * @returns {Array}
   */
  validateBetsRangeAndMaxNumber(bets) {
    const isValid = bets.reduce((acc, bet, index) => {
      const game = this.possibleGames.rows.find(
        (possibleBet) => possibleBet.id === bet.game_id
      )

      const newAcc = [...acc]

      if (!game) {
        return newAcc
      }

      const maxInBet = Math.max(...bet.numbers)

      if (maxInBet > game.range) {
        newAcc.push({
          message: `Bet ${game.type} in index ${index} has the wrong range`,
        })
      }

      if (bet.numbers.length !== game.max_number) {
        newAcc.push({
          message: `Bet ${game.type} in index ${index} has the wrong length`,
        })
      }

      return newAcc
    }, [])
    return isValid
  }

  async startPossibleGames(bets) {
    this.possibleGames = await Game.query()
      .where(
        'id',
        'in',
        bets.map((bet) => bet.game_id)
      )
      .fetch()
  }

  /**
   *
   * @param {Bets} bets
   * @returns {number}
   */
  getBetsTotalPrice(bets) {
    return bets.reduce((acc, bet) => {
      const betGame = this.possibleGames.rows.find(
        (possibleGame) => possibleGame.id === bet.game_id
      )

      return acc + betGame.price
    }, 0)
  }
}

module.exports = PurchaseController
