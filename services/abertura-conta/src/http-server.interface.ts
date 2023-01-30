export interface IHttpServer {
    register(url: string, method: string, callback: Function): Promise<void>
    listen(port: number): void
}