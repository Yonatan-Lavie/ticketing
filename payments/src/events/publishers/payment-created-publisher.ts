import { Publisher, PaymentCreatedEvent, Subjects } from '@ly-common-lib/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}