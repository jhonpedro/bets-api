'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Game = use('App/Models/Game')

/**
 * Resourceful controller for interacting with games
 */
class GameController {
  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index() {
    const games = await Game.query().where({ is_deactivated: false }).fetch()

    return games
  }

  /**
   * Create/save a new game.
   * POST games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color',
      'min_cart_value',
      'is_deactivated',
    ])

    const game = await Game.create(data)

    return game
  }

  /**
   * Update game details.
   * PUT or PATCH games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color',
      'min_cart_value',
      'is_deactivated',
    ])

    const game = await Game.findOrFail(params.id)

    game.merge(data)

    await game.save()

    return game
  }

  /**
   * Deactivate a game with id.
   * DELETE games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const game = await Game.findOrFail(params.id)

    if (!game.is_deactivated) {
      return
    }

    game.is_deactivated = false

    await game.save()
  }
}

module.exports = GameController
