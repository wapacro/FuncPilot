export interface ContainerElement {
    singleton: boolean
    closure: () => Promise<any>
    instance?: any
}