'use strict'

const Mail = use('Mail')

class NewForgotPasswordMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewForgotPasswordMail-job'
  }

  // This is where the work is done.
  async handle({ email, name, redirectUrl }) {
    process.stdout.write('NewForgotPasswordMail-job started\n')
    await Mail.send(
      'emails.forgot_password',
      { name, link: redirectUrl },
      (message) => {
        message.to(email)
        message.from('recocer.tgl@email.com | TGL App')
        message.subject('Password recover TGL')
      }
    )
  }
}

module.exports = NewForgotPasswordMail
