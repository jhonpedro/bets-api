'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetsSchema extends Schema {
  up() {
    this.create('bets', (table) => {
      table.increments()
      table
        .integer('game_id')
        .references('id')
        .inTable('games')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('numbers').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('bets')
  }
}

module.exports = BetsSchema
