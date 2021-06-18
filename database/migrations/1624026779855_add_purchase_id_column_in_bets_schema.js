'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPurchaseIdColumnInBetsSchema extends Schema {
  up() {
    this.table('bets', (table) => {
      table
        .integer('purchase_id')
        .references('id')
        .inTable('purchases')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
    })
  }

  down() {
    this.table('bets', (table) => {
      table.dropColumn('purchase_id')
    })
  }
}

module.exports = AddPurchaseIdColumnInBetsSchema
