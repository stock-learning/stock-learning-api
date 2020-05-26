
import { Proxy } from "./proxy";

export function Authentication() {
    return Proxy.builder()
        .condition((ctx: PropertyDescriptor, args: IArguments): boolean => {
            console.warn('Authentication not implemented!');
            return true;
        })
        .reject(() => {
            throw new Error('Proxy blocked execution');
        })
        .build();
}