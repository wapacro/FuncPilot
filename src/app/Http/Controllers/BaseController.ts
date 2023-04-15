import type { HttpResponseInit } from '@azure/functions'

export abstract class BaseController {
    protected abort(code: number, message: string = ''): HttpResponseInit {
        return {
            status: code,
            body: message
        }
    }
}