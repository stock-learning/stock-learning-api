import { Channel, connect as connectToRabbitMQ, Message } from 'amqplib/callback_api';
import { IConsumer } from './../rabbitmq/iconsumer';
import apiStub from 'src/stubs/api-stub';

class RabbitMQ {
    private _channel: Channel | undefined;
    private _consumers: any;

    constructor() {
        this._consumers = {};
    }

    public connect(): Promise<Channel> {
        return new Promise((resolve, reject) => {
            if (!process.env.RABBITMQ_CONNECTION_STRING) {
                reject(new Error('RABBITMQ_CONNECTION_STRING not defined'));
            } else {
                connectToRabbitMQ(process.env.RABBITMQ_CONNECTION_STRING || '', (err0, conn) => {
                    if (err0) {
                        reject(err0);
                    } else {
                        conn.createChannel((err1, channel) => {
                            if (err1) {
                                reject(err1);
                            } else {
                                this._channel = channel;
                                this._channel.assertQueue(process.env.API_QUEUE_NAME || '', { durable: false });
                                this._channel.consume(process.env.API_QUEUE_NAME || '', (msg: Message | null) => {
                                    console.info(`Message received '${msg?.content.toString()}'`);
                                    const message = JSON.parse(msg?.content?.toString() || '');
                                    if (message?.primitive && message?.content && !!this._consumers[message?.primitive]) {
                                        console.info(`Message being handled`);
                                        this._consumers[message?.primitive](message?.content);
                                    } else {
                                        console.warn(`Cannot handle message\nconsumers: ${JSON.stringify(this._consumers)}\nmessage: ${JSON.stringify(message)}`);
                                    }
                                }, {
                                    noAck: true
                                });
                                resolve(channel);
                            }
                        })
                    }
                });
            }
        });
    }

    public sendMessage(queue: string, primitive: string, content: any): boolean {
        return this._channel?.sendToQueue(queue, Buffer.from(JSON.stringify({ primitive: primitive, content: content }))) || false;
    }

    public setConsumers(consumers: { primitive: string, consumer: IConsumer<any> }) {
        this._consumers = consumers;
    }

}


export default new RabbitMQ();
