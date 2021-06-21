const { spawn } = require('child_process')

const migrations = spawn('node', ['ace', 'migration:run'])

const redisWorkers = spawn('node', ['ace', 'kue:listen'])

migrations.stdout.on('data', (buffer) =>
  process.stdout.write(`Migrations -> ${buffer.toString()}\n`)
)

redisWorkers.stdout.on('data', (buffer) =>
  process.stdout.write(`Redis -> ${buffer.toString()}\n`)
)
