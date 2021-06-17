'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamesSchema extends Schema {
  up() {
    this.create('games', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.text('description').notNullable()
      table.integer('range').notNullable()
      table.float('price', 2).notNullable()
      table.integer('max_number').notNullable()
      table.string('color').notNullable()
      table.float('min_cart_value', 2).notNullable()
      table.boolean('is_deactivated', 2).defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('games')
  }
}

module.exports = GamesSchema
