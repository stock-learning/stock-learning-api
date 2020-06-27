


export class Proxy {

    public static builder(): Proxy {
        return new Proxy();
    }

    private _predicate: (ctx: PropertyDescriptor, args: IArguments) => boolean;
    private _reject: () => any;

    constructor() {
        this._predicate = () => true;
        this._reject = () => undefined;
    }

    public condition(predicate: (ctx: PropertyDescriptor, args: IArguments) => boolean): Proxy {
        this._predicate = predicate;
        return this;
    }

    public reject(callback: () => any): Proxy {
        this._reject = callback;
        return this;
    }

    public build(): any {
        const _predicate = this._predicate;
        const _reject = this._reject;
        return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
            const originalMethod = descriptor.value;
            descriptor.value = function () {
                const context = this;
                const args = arguments;
                if (_predicate(context, args)) {
                    return originalMethod.apply(context, args);
                } else {
                    return _reject();
                }
            }
        }
    }
}

export const proxyMethod = (predicate: (ctx: PropertyDescriptor, ...args: any[]) => boolean, reject: () => any) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            if (predicate(target, args)) {
                return originalMethod.apply(target, args);
            } else {
                return reject();
            }
        };
    };
}


