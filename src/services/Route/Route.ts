import type { RouteHandler, RouteOptions } from './contracts.js'
import { app, HttpHandler, HttpMethod, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'

export class Route {
    public route(pattern: string, methods: HttpMethod[], handler: RouteHandler, options?: RouteOptions): void {
        pattern = pattern.startsWith('/') ? pattern.substring(1) : pattern
        app.http(options?.name ?? this.getFunctionNameByRoute(pattern, methods), {
            handler: this.getAzureFunctionHandler(handler),
            authLevel: options?.authLevel ?? 'function',
            route: pattern,
            methods: methods,
            /*extraInputs: options?.extraInputs,
            extraOutputs: options?.extraOutputs*/
        })
    }

    public get(pattern: string, handler: RouteHandler, options?: RouteOptions): void {
        void this.route(pattern, ['GET'], handler, options)
    }

    public post(pattern: string, handler: RouteHandler, options?: RouteOptions): void {
        void this.route(pattern, ['POST'], handler, options)
    }

    public put(pattern: string, handler: RouteHandler, options?: RouteOptions): void {
        void this.route(pattern, ['PUT'], handler, options)
    }

    public patch(pattern: string, handler: RouteHandler, options?: RouteOptions): void {
        void this.route(pattern, ['PATCH'], handler, options)
    }

    public delete(pattern: string, handler: RouteHandler, options?: RouteOptions): void {
        void this.route(pattern, ['DELETE'], handler, options)
    }

    protected getFunctionNameByRoute(pattern: string, methods: HttpMethod[]): string {
        return `${methods.join('-')}-${pattern.replaceAll('/', '-').replaceAll(/[{}.]/g, '')}`
    }

    protected getAzureFunctionHandler(handler: RouteHandler): HttpHandler {
        if (typeof handler !== 'object') {
            return handler
        }

        let [controller, method] = handler
        return async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
            // @ts-ignore
            return controller[method](request, context)
        }
    }
}
