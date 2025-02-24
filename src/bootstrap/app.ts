import Container from '../services/Container/Container.js'
import Route from '../services/Route/Route.js'
import CacheManager from '../services/Cache/CacheManager.js'
import registerApiRoutes from '../routes/api.js'

(async function () {

    /*
    |--------------------------------------------------------------------------
    | Bootstrap the Application
    |--------------------------------------------------------------------------
    |
    | The first thing we will do is creating the base app IoC container, which
    | allows us to bind important class instances to resolve them later,
    | using a singleton (only evaluated once) or a regular binding.
    |
    */

    global.app = new Container()

    await app.singleton('Route', async () => new Route())
    await app.singleton('Cache', async () => new CacheManager())

    /*
    |--------------------------------------------------------------------------
    | Register Routes And Handlers
    |--------------------------------------------------------------------------
    |
    | Next, we load the routes defined in "api.ts" and their corresponding
    | handlers. This instructs the Azure Functions Runtime what to do when
    | the corresponding events are triggered.
    |
    */

    registerApiRoutes(await app.make('Route'))
    // registerQueueHandlers()
    // ...

})()