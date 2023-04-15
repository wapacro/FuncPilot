import { InvalidArguments } from './exceptions.js'
import { Repository } from './Repository.js'
import { MemoryStore } from './MemoryStore.js'

export class CacheManager {
    protected stores: { [key: string]: Repository } = {}

    /**
     * Get a cache store instance by name, wrapped in a repository.
     * @param name
     */
    public store(name: string | undefined = undefined): Repository {
        name = name ?? this.getDefaultDriver()
        return this.stores[name] = this.stores[name] ?? this.resolve(name)
    }

    /**
     * Resolve the given store.
     * @param name
     */
    public resolve(name: string): Repository {
        const driverMethod = `create${name.charAt(0).toUpperCase()}${name.slice(1)}Driver`

        if (typeof this[driverMethod as keyof this] !== 'function') throw new InvalidArguments(`Driver ${name} is not supported.`)
        // @ts-ignore
        return this[driverMethod]()
    }

    /**
     * Create an instance of the Memory cache driver.
     * @protected
     */
    protected createMemoryDriver(): Repository {
        return new Repository(new MemoryStore())
    }

    /**
     * Get the default cache driver name.
     */
    public getDefaultDriver(): string {
        return 'memory'
    }
}