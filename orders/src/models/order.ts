import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@ly-common-lib/common';
import { TicketDoc } from './ticket'

export { OrderStatus };

// an interface that describes the properties 
// that are required to create a new Order
interface OrderAttrs {
    userId: string,
    status: OrderStatus,
    expiresAt: Date,
    ticket: TicketDoc,
}
// An interface that describes the properties
// that a Order Document has
interface OrderDoc extends mongoose.Document {
    userId: string,
    status: OrderStatus,
    expiresAt: Date,
    ticket: TicketDoc,
    version: number,
}

// An interface that describes the properties
// that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs) : OrderDoc;
    findByEvent(event: {id: string, version: number}): Promise<OrderDoc | null>
}



const orderSchema = new mongoose.Schema(
// Orders Schema
{
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
    },
    ticket: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Ticket' 
    }
},
// Options 
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
orderSchema.set('versionKey', 'version');
//This plugin brings optimistic concurrency control to 
//Mongoose documents by incrementing document version numbers on each save
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.findByEvent = (event: {id: string, version: number}) => {
    return Order.findOne({
        _id: event.id,
        version: event.version - 1
    });
};


orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc,OrderModel>('Order', orderSchema);

export { Order }