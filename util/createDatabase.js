const pg = require('pg')
const Env = require('@adonisjs/framework/src/Env')

async function execute() {
  process.stdout.write(`Creating the table ${process.argv[2]}\n`)

  const envVars = new Env('./')

  const client = new pg.Client({
    host: envVars.get('DB_HOST'),
    user: envVars.get('DB_USER'),
    password: envVars.get('DB_PASSWORD'),
    port: envVars.get('DB_PORT'),
  })
  try {
    await client.connect()
    const query = `CREATE DATABASE ${envVars.get('DB_DATABASE')}`
    await client.query(query)

    await client.end()
  } catch (error) {
    process.stdout.write('Error during the database creation\n')
    process.exit(1)
  }

  process.stdout.write('Succefuly created the database\n')
}

execute()
