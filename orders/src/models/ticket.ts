import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';


// an interface that describes the properties 
// that are required to create a new Ticket
interface TicketAttrs {
    id: string,
    title: string,
    price: number,
}

// An interface that describes the properties
// that a Ticket Document has
export interface TicketDoc extends mongoose.Document {
    title: string,
    price: number,
    version: number,
    isReserved(): Promise<boolean>
}


// An interface that describes the properties
// that a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs) : TicketDoc;
}



const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
},{  
    toJSON: {
          transform(doc, ret) {
              ret.id = ret._id;
              delete ret._id;
          }
      }
  });

// config monogoDB repalce __v filed  name with a new name "version" 
// this  __v  filed is represent the version number of updated doc
ticketSchema.set('versionKey', 'version');
//This plugin brings optimistic concurrency control to 
//Mongoose documents by incrementing document version numbers on each save
ticketSchema.plugin(updateIfCurrentPlugin);


ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price
    });
};
ticketSchema.methods.isReserved = async function (){
    // this === the ticket document that we just called 'isReserved' on
    const existingOrder = await Order.findOne({
        ticket: this as any,
        status:{
            $in: [
                OrderStatus.Created ||
                OrderStatus.AwaitingPayment ||
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder
};

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket', ticketSchema);

export { Ticket }