import { Publisher, OrderCreatedEvent, Subjects } from '@ly-common-lib/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}