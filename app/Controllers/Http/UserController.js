'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use('App/Models/User')
const AppException = use('App/Exceptions/AppException')

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
   */
  async show({ auth }) {
    return auth.user
  }

  /**
   * Update a single user based in his id
   * provided from auth
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update({ request, auth }) {
    const { name, password } = request.only(['name', 'password'])

    const user = await auth.getUser()

    if (name && password) {
      if (password.length < 6) {
        throw new AppException('Password must have at least 6 characters')
      }
      user.merge({ name, password })
    } else {
      user.merge({ name })
    }

    await user.save()

    return user
  }
}

module.exports = UserController
