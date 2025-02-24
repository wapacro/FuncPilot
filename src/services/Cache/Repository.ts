import type { Store } from './contracts.js'

export default class Repository {
    public constructor(protected store: Store) {
    }

    /**
     * Determine if an item exists in the cache.
     * @param key
     */
    public async has(key: string): Promise<boolean> {
        return await this.get(key) !== undefined
    }

    /**
     * Determine if an item doesn't exist in the cache.
     * @param key
     */
    public async missing(key: string): Promise<boolean> {
        return !await this.has(key)
    }

    /**
     * Retrieve an item from the cache by key.
     * @param key
     * @param fallback
     */
    public async get(key: string, fallback: any = undefined): Promise<any> {
        return await this.store.get(this.itemKey(key)) ?? fallback
    }

    /**
     * Retrieve an item from the cache and delete it.
     * @param key
     * @param fallback
     */
    public async pull(key: string, fallback: any = undefined): Promise<any> {
        const value = await this.get(key, fallback)
        if (value !== fallback) await this.forget(key)

        return value
    }

    /**
     * Store an item in the cache.
     * @param key
     * @param value
     * @param seconds
     */
    public async put(key: string, value: any, seconds: number | undefined = undefined): Promise<boolean> {
        if (seconds === undefined) return this.forever(key, value)
        if (seconds <= 0) return this.forget(key)

        return this.store.put(this.itemKey(key), value, seconds)
    }

    /**
     * Store an item in the cache if the key does not exist.
     * @param key
     * @param value
     * @param seconds
     */
    public async add(key: string, value: any, seconds: number | undefined = undefined): Promise<boolean> {
        // If the store has an "add" method we will call the method on the store, so it
        // has a chance to override this logic. Some drivers better support the way
        // this operation should work with a total "atomic" implementation of it.
        if (typeof this.store['add' as keyof Store] === 'function') {
            // @ts-ignore
            return this.store['add'](this.itemKey(key), value, seconds)
        }

        if (await this.missing(key)) return this.put(key, value, seconds)
        return false
    }

    /**
     * Increment the value of an item in the cache.
     * @param key
     * @param value
     */
    public async increment(key: string, value: number = 1): Promise<number | boolean> {
        return this.store.increment(key, value)
    }

    /**
     * Decrement the value of an item in the cache.
     * @param key
     * @param value
     */
    public async decrement(key: string, value: number = 1): Promise<number | boolean> {
        return this.store.decrement(key, value)
    }

    /**
     * Store an item in the cache indefinitely.
     * @param key
     * @param value
     */
    public async forever(key: string, value: any): Promise<boolean> {
        return this.store.forever(this.itemKey(key), value)
    }

    /**
     * Get an item from the cache, or execute the given Closure and store the result.
     * @param key
     * @param seconds
     * @param callback
     */
    public async remember(key: string, seconds: number, callback: () => Promise<any>): Promise<any> {
        let value = await this.get(key)

        // If the item exists in the cache we will just return this immediately and if
        // not we will execute the given Closure and cache the result of that for a
        // given number of seconds, so it's available for all subsequent requests.
        if (value !== undefined) return value

        value = await callback()
        this.put(key, value, seconds)

        return value
    }

    /**
     * Get an item from the cache, or execute the given Closure and store the result forever.
     * @param key
     * @param callback
     */
    public async rememberForever(key: string, callback: () => Promise<any>): Promise<any> {
        let value = await this.get(key)

        // If the item exists in the cache we will just return this immediately and if
        // not we will execute the given Closure and cache the result of that for a
        // given number of seconds, so it's available for all subsequent requests.
        if (value !== undefined) return value

        value = await callback()
        this.forever(key, value)

        return value
    }

    /**
     * Remove an item from the cache.
     * @param key
     */
    public async forget(key: string): Promise<boolean> {
        return this.store.forget(key)
    }

    /**
     * Format the key for a cache item.
     * @param key
     * @protected
     */
    protected itemKey(key: string): string {
        return key
    }
}