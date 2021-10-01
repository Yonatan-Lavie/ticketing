import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener'

console.clear();


const listenerId = randomBytes(4).toString('hex') 
const stan = nats.connect('ticketing', listenerId , {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log(
`Listener connected to NATS
    listener id: ${listenerId}
    whaiting for messages..`);

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    })

    new TicketCreatedListener(stan).listen();
});

// interapt signals fire whan server is restarted
// closing connection before restart the server
process.on('SIGINT', () => stan.close());
// terminate signal  whan server is terminated
// closing connection before terminating the server
process.on('SIGTERM', () => stan.close());


