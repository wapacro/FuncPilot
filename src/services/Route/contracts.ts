import type { BaseController } from '../../app/Http/Controllers/BaseController.js'
import type { FunctionInput, FunctionOutput, HttpRequest, HttpResponseInit, InvocationContext, } from '@azure/functions'

export type RouteHandler =
    ((request: HttpRequest, context: InvocationContext) => Promise<HttpResponseInit>)
    | [BaseController, string]

export interface RouteOptions {
    name?: string
    authLevel?: 'anonymous' | 'function' | 'admin'
    extraInputs?: FunctionInput[]
    extraOutputs?: FunctionOutput[]
}