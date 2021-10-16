import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// an interface that describes the properties 
// that are required to create a new Ticket
interface TicketAttrs {
    title: string,
    price: number,
    userId: string
}

// An interface that describes the properties
// that a Ticket Document has
interface TicketDoc extends mongoose.Document {
    title: string,
    price: number,
    userId: string,
    version: number,
    orderId?: string,
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
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String
    }
}, 
{  
      toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);


// config monogoDB repalce __v filed  name with a new name "version" 
// this  __v  filed is represent the version number of updated doc
ticketSchema.set('versionKey', 'version');
//This plugin brings optimistic concurrency control to 
//Mongoose documents by incrementing document version numbers on each save
ticketSchema.plugin(updateIfCurrentPlugin);



ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket', ticketSchema);

export { Ticket }