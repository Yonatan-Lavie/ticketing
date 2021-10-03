import { Publisher, OrderCancelledEvent, Subjects } from '@ly-common-lib/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled= Subjects.OrderCancelled
}