import request from 'supertest';
import {genCookie} from '../../test/helper';
import {app} from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper'



it('has a route headnler to /api/tickets for posts requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).toEqual(401);
});

it('return a status other then 401 if the user is signed in', async () => {
    const cookie = await genCookie();

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    const cookie = await genCookie();
    let response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title:'',
        price: 10
    });

    expect(response.status).toEqual(400);

    response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        price: 10
    });

    expect(response.status).toEqual(400);
});

it('returns an error if an invalid price is provided', async () => {
    const cookie = await genCookie();
    let response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title:'asdf',
        price: -10
    });

    expect(response.status).toEqual(400);
    
    response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title:'asdf'
    });

    expect(response.status).toEqual(400);
});

it('creates a ticket with valid input', async () => {
    const title = 'asdf';
    const price = 10;
    const cookie = await genCookie();
    
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title,
        price
    });

    expect(response.status).toEqual(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(price)
    expect(tickets[0].title).toEqual(title)
});

it('publishes an event', async () => {
    const title = 'asdf';
    const price = 10;
    const cookie = await genCookie();
    
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title,
        price
    });

    expect(response.status).toEqual(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})


