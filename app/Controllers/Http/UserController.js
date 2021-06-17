'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes')} Auth */

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.response
   */
  async show({ auth }) {
    const user = await User.find(auth.jwtPayload.uid)

    return user
  }
}

module.exports = UserController
