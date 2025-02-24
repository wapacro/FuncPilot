import type { FunctionInput, FunctionOutput, HttpRequest, HttpResponseInit, InvocationContext, } from '@azure/functions'

export type Constructor<T> = new (...args: any[]) => T

export type RouteHandler =
    ((request: HttpRequest, context: InvocationContext) => Promise<HttpResponseInit>)
    | [Constructor<any>, string?]

export interface RouteOptions {
    name?: string
    authLevel?: 'anonymous' | 'function' | 'admin'
    extraInputs?: FunctionInput[]
    extraOutputs?: FunctionOutput[]
}