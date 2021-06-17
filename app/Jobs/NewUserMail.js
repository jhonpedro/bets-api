'use strict'

const Mail = use('Mail')

class NewUserMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewUserMail-job'
  }

  // This is where the work is done.
  async handle({ name, email }) {
    process.stdout.write(`NewUserMail-job started\n`)

    await Mail.send(['emails.new_user'], { name }, (message) => {
      message
        .to(email)
        .from('mail.TGL@app.com')
        .subject('Welcome to The Greatest App')
    })
  }
}

module.exports = NewUserMail
