export class PubSub {
    private subscribers: any = {};
    private events: Array<any> = [];

    constructor() {
        setInterval(async () => {
            if (this.events.length > 0) {
                const event = this.events.reverse().pop();
                if (Array.isArray(this.subscribers[event.event])) {
                    this.subscribers[event.event].forEach((sub: any) => {
                        sub(event.data);
                    });
                }
            }
        }, 60000);
    }

    subscribe(event: string, fn: (data: any) => void) {
        if (Array.isArray(this.subscribers[event])) {
            this.subscribers[event] = [...this.subscribers[event], fn];
        } else {
            this.subscribers[event] = [fn];
        }
        return () => {
            this.unsubscribe(event, fn);
        };
    }

    unsubscribe(event: string, fn: (data: any) => void) {
        this.subscribers[event] = this.subscribers[event].filter(
            (sub: any) => sub !== fn
        );
    }

    publish(event: string, data: any) {
        this.events.push({ event: event, data: data });
        return true;
    }
}
