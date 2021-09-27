import request from 'supertest';
import {genCookie, genFakeId} from '../../test/helper'
import {app} from '../../app';

it('return a 404 if the ticket is not found ', async () => {
    const fakeId = genFakeId()
    const cookie = await genCookie();
    
    const response = await request(app)
        .get(`/api/tickets/${fakeId}`)
        .set('Cookie', cookie);

    expect(response.status).toEqual(404);
});

it('return the ticket if the ticket is found ', async () => {
    const title = 'concert';
    const price = 20;
    const cookie = await genCookie();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .set('Cookie',cookie)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);

});

