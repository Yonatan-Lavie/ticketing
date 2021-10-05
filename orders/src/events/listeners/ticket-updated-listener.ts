import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@ly-common-lib/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket'


export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const {title, price, id, version } = data;

        const ticket = await Ticket.findById(id);

        if(!ticket || version !== ticket.version - 1){
            throw new Error('Ticket not found');
        }
        ticket.set({ title, price });
        
        await ticket.save();

        msg.ack();
    }
}