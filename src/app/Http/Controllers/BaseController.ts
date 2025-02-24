import type { HttpResponseInit } from '@azure/functions'

export default abstract class BaseController {
    protected abort(code: number, message: string = ''): HttpResponseInit {
        return {
            status: code,
            body: message
        }
    }
}