'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserNameNotUniqueSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.dropUnique('name')
    })
  }

  down() {
    this.table('user', (table) => {
      table.string('name').unique().alter()
    })
  }
}

module.exports = UserNameNotUniqueSchema
