'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass a relative path from the project root.
*/

const { spawn } = require('child_process')

const execute = spawn('node', ['./util/execute.js'])
execute.stdout.on('data', (buffer) =>
  process.stdout.write(`${buffer.toString()}\n`)
)

const { Ignitor } = require('@adonisjs/ignitor')

// eslint-disable-next-line global-require
new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)
