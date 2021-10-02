import mongoose from 'mongoose'
import express, {Request, Response} from 'express';
import { NotFoundError, OrderStatus, requireAuth, validateRequest} from '@ly-common-lib/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must bey provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { ticketId } = req.body;
        
        // Find the ticket the user trying to order in the database
        const ticket = await Ticket.findById(ticketId);
        if(!ticket){
            throw new NotFoundError();
        }

        // Make sure that this ticket in ont already reserved
        // Run query to look at all orders. Find an order where the ticket
        // is the ticket we just found  *and* the orders status in *not* cancelled.
        // if we find an order from that means the ticket *is* reserved


        // Calculate an expiration date for this order

        // Build the order and save it to the database

    //Publish an event saying that an order was created

    res.send({});
});

export { router as newOrderRouter };