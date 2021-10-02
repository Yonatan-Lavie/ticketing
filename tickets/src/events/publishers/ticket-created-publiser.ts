import { Publisher, Subjects, TicketCreatedEvent} from '@ly-common-lib/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}