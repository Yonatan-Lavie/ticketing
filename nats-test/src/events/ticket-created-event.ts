import { Subjects } from './subjects';

export interface TicketCreatedEvent {
    subject: Subjects.Ticketcreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}