import { Route } from '../services/Route/Route.js'
import { HelloController } from '../app/Http/Controllers/HelloController.js'

export default function (route: Route) {

    route.get('/hello', [new HelloController, 'index'])

}