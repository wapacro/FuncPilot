import type { Store } from './contracts.js'
import NodeCache from 'node-cache'

export default class MemoryStore implements Store {
    protected cache: NodeCache

    public constructor() {
        this.cache = new NodeCache()
    }

    async get(key: string): Promise<any> {
        return this.cache.get(key)
    }

    async put(key: string, value: any, seconds: number): Promise<boolean> {
        return this.cache.set(key, value, seconds)
    }

    async forever(key: string, value: any): Promise<boolean> {
        return this.cache.set(key, value)
    }

    async increment(key: string, value: number = 1): Promise<number> {
        const existing = await this.get(key)
        if (existing === undefined) {
            await this.forever(key, value)
            return value
        }

        value = existing + value
        await this.forever(key, value)
        return value
    }

    async decrement(key: string, value: number = 1): Promise<number> {
        return this.increment(key, value * -1)
    }

    async forget(key: string): Promise<boolean> {
        this.cache.del(key)
        return true
    }

    async flush(): Promise<boolean> {
        this.cache.flushAll()
        this.cache.flushStats()
        return true
    }

    getPrefix(): string {
        return ''
    }
}