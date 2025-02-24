import { BaseController } from './BaseController.js'
import { HttpRequest, HttpResponseInit } from '@azure/functions'

export default class HelloController extends BaseController {

    /**
     * Handle the incoming request
     * @param request
     */
    public async index(request: HttpRequest): Promise<HttpResponseInit> {
        const name = request.query.get('name')

        return {
            status: 200,
            jsonBody: {
                message: name ? `Hello, ${name}!` : 'Hello World!'
            }
        }
    }

}