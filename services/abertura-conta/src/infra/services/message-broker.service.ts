import { EventEmitter } from "events"
import { v4 } from 'uuid'

export interface Message<T> {
    id: string
    data: T
}

export class MessageBroker<T> extends EventEmitter {
    private pendingMessages: {
        [index: string]: {
            resolve: (data: any) => void
            reject: (err: Error) => void
        }
    } = {}

    constructor(
        private send: (msg: string) => Promise<void>,
        private opts = {
            messageTimeout: 15000
        }
    ) {
        super()
    }

    processMessage({ id, data }: Message<T>) {
        delete this.pendingMessages[id]
        this.emit(id, data)
    }

    sendData<K>(data: T): Promise<K> {
        return new Promise((resolve, reject) => {
            var msg = {
                id: v4(),
                data
            }
            this.send(JSON.stringify(msg))

            this.pendingMessages[msg.id] = {
                resolve,
                reject
            }

            const responseHandler = (data: K) => {
                delete this.pendingMessages[msg.id]
                resolve(data)
            }

            this.once(msg.id, responseHandler)

            setTimeout(() => {
                delete this.pendingMessages[msg.id]
                this.removeListener(msg.id, responseHandler)
                reject(new Error("Timeout"))
            }, this.opts.messageTimeout)
        })
    }

    close() {
        for (const key in this.pendingMessages) {
            this.pendingMessages[key].reject(new Error("Connection closed"))
        }
        this.pendingMessages = {}
    }
}

export class MyMessageBroker extends EventEmitter {

    queue: Array<any> = []

    constructor() {
        super()

        setInterval(async () => {
            if (this.queue.length > 0) {
                setTimeout(async () => {
                    this.process(this.queue.pop())
                }, 3000)
            }
        }, 3000)
    }

    send(msg: any) {
        this.emit('send', msg)
        this.queue.push(msg)
    }

    receive(queue: any) {
        this.emit('receive', queue)
    }

    process(msg: any) {
        this.emit('process', msg)
    }
}

export class PubSub {
    private subscribers: any = {}
    private events: Array<any> = []

    constructor() {
        setInterval(async () => {
            if (this.events.length > 0) {
                let event = this.events.reverse().pop()
                if (Array.isArray(this.subscribers[event.event])) {
                    this.subscribers[event.event].forEach((sub: any) => {
                        sub(event.data)
                    })
                }
            }
        }, 60000)
    }

    subscribe(event: string, fn: (data: any) => void) {
        if (Array.isArray(this.subscribers[event])) {
            this.subscribers[event] = [...this.subscribers[event], fn]
        } else {
            this.subscribers[event] = [fn]
        }
        return () => {
            this.unsubscribe(event, fn)
        }
    }

    unsubscribe(event: string, fn: (data: any) => void) {
        this.subscribers[event] = this.subscribers[event].filter(
            (sub: any) => sub !== fn
        )
    }

    publish(event: string, data: any) {
        this.events.push({ event: event, data: data })
        return true
    }
}