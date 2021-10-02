import { Publisher, Subjects, TicketUpdatedEvent } from '@ly-common-lib/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}