import type { ContainerElement } from './contracts.js'
import { UnresolvedBinding } from './exceptions.js'

export class Container {
    protected container: Map<string, ContainerElement> = new Map()

    public async register(name: string, instance: () => Promise<any>, singleton: boolean = false): Promise<void> {
        const element: ContainerElement = {
            singleton,
            closure: instance
        }

        if (singleton) element.instance = await instance()
        this.container.set(name, element)
    }

    public async singleton(name: string, instance: () => Promise<any>): Promise<void> {
        await this.register(name, instance, true)
    }

    public async make(name: string): Promise<any> {
        const element = this.container.get(name)
        if (!element) throw new UnresolvedBinding(`IoC binding ${name} could not be resolved.`)
        if (element.singleton) return element.instance
        return await element.closure()
    }

    public has(name: string): boolean {
        return this.container.has(name)
    }
}