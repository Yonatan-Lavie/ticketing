import { requireAuth } from '@ly-common-lib/common';
import express, {Request, Response} from 'express';
import {Ticket} from '../models/ticket'

const router = express.Router();

router.get(
    '/api/tickets/:userId',
    requireAuth,
    async (req: Request, res: Response) => {
    
    const userId = req.params.userId;

    const tickets = await Ticket.find({orderId: undefined, userId: userId});

    res.send(tickets);
});

export { router as userTicketsRouter };