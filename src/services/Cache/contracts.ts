export interface Store {
    get(key: string): Promise<any>
    put(key: string, value: any, seconds: number): Promise<boolean>
    increment(key: string, value?: number): Promise<number | boolean>
    decrement(key: string, value?: number): Promise<number | boolean>
    forever(key: string, value: any): Promise<boolean>
    forget(key: string): Promise<boolean>
    flush(): Promise<boolean>
    getPrefix(): string
}