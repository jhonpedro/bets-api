'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const crypto = require('crypto')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const Kue = use('Kue')
const NewForgotPasswordMail = use('App/Jobs/NewForgotPasswordMail')
const User = use('App/Models/User')
const ForgotPassword = use('App/Models/ForgotPassword')
const Database = use('Database')

/**
 * Resourceful controller for interacting with forgotpasswords
 */
class ForgotPasswordController {
  /**
   * Create/save a new forgotpassword.
   * POST forgotpasswords
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { email, redirect_url: redirectUrl } = request.only([
      'email',
      'redirect_url',
    ])

    const token = crypto.randomUUID()

    const user = await User.findByOrFail('email', email)
    await ForgotPassword.create({ token, user_id: user.id })

    Kue.dispatch(
      NewForgotPasswordMail.key,
      { email, name: user.name, redirectUrl: `${redirectUrl}/?t=${token}` },
      { attempts: 3 }
    )

    return response.status(200).send()
  }

  /**
   * Update forgotpassword details.
   * PUT or PATCH forgotpasswords/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response }) {
    const { t: token } = request.get()
    const password = request.input('password')

    const forgotPassword = await Database.table('forgot_passwords')
      .where({ token })
      .first()

    await Database.table('users')
      .where({ id: forgotPassword.user_id })
      .update({ password: await Hash.make(password) })

    await Database.table('forgot_passwords')
      .where({ id: forgotPassword.id })
      .del()

    return response.status(200).send()
  }
}

module.exports = ForgotPasswordController
