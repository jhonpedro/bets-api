'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/', 'UserController.store').validator('StoreUser')
  Route.get('/', 'UserController.show').middleware(['auth'])
}).prefix('/users')

Route.post('/session', 'SessionController.store').validator('StoreSession')
