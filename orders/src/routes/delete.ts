import express, {Request, Response} from 'express';
import mongoose from 'mongoose'
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@ly-common-lib/common';
import { Order, OrderStatus } from '../models/order'
import { param } from 'express-validator';
import { OrderCancelledPublisher} from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
    '/api/orders/:orderId',
    requireAuth,
    [
        param('orderId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('valid orderId must bey provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId).populate('ticket');
    
    if(!order){
        throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
            id: order.ticket.id
        }
    });

    res.status(204).send({});
});

export { router as deleteOrderRouter };