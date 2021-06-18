'use strict'

const Mail = use('Mail')

class NewPurchaseMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewPurchaseMail-job'
  }

  // This is where the work is done.
  async handle({ email, name, price }) {
    process.stdout.write('NewPurchaseMail-job started\n')

    await Mail.send(['emails.new_purchase'], { name, price }, (message) => {
      message.to(email).from('mail.TGL@app.com').subject('New purchase in TGL')
    })
  }
}

module.exports = NewPurchaseMail
