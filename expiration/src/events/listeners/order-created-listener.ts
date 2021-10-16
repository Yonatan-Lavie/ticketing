import { Listener, OrderCreatedEvent, Subjects } from '@ly-common-lib/common';
import { Message } from 'node-nats-streaming';
import { expiretionQueue } from '../../queues/expiration-queue';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const delay = new Date(data.expiresAd).getTime() - new Date().getTime();
        console.log('Waiting this many milliseconds to process the job: ', delay);
        
        expiretionQueue.add({
            orderId: data.id
        }, {
            delay: delay,
        });
        msg.ack();
    }
}