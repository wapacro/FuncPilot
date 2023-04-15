import { Container } from '../services/Container/Container.js'

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

})()