export interface IConsumer<T> {
    consumerName: string;
    consume(message: T): void;
}
