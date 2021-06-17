'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchasesSchema extends Schema {
  up() {
    this.create('purchases', (table) => {
      table.increments()
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.float('price_total').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('purchases')
  }
}

module.exports = PurchasesSchema
