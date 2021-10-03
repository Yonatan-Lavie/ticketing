import { requireAuth } from '@ly-common-lib/common';
import express, {Request, Response} from 'express';
import { Order } from '../models/order'

const router = express.Router();

router.get(
    '/api/orders',
    requireAuth,
    async (req: Request, res: Response) => {
    
    const userId = req.currentUser!.id

    const orders = await Order.find({
        userId: userId
    }).populate('ticket');

    res.send(orders);
});

export { router as indexOrderRouter };