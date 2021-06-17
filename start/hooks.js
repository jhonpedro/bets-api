const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Database = use('Database')

  const existInDatabase = async (data, field, _, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const [table, column] = args

    const exists = await Database.table(table).where(column, value).first()

    if (!exists) {
      // eslint-disable-next-line no-throw-literal
      throw `Your ${field} could not be found.`
    }
  }
  Validator.extend('exists', existInDatabase)
})
