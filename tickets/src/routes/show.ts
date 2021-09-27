import express, {Request, Response} from 'express';
import { NotFoundError, requireAuth } from '@ly-common-lib/common'
import {Ticket} from '../models/ticket'

const router = express.Router();

router.get(
    '/api/tickets/:id',
    requireAuth,
    async (req: Request, res: Response) => {
    
    const id = req.params.id;

    const ticket = await Ticket.findById(id);

    if(!ticket){
        throw new NotFoundError();
    }
    res.send(ticket);
});

export { router as showTicketRouter };