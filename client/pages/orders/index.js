import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { ListItem } from '@mui/material';

const OrderStatus = {
  // Whan the order has been created, but the
  // ticket it is trying to order has not been reserved
  Created: 'created',

  // The ticket the order is trying to reserve has already
  // been reserved, or whan the user has cancelled the order
  // The order expires before payment
  Cancelled: 'cancelled',

  // The order has successfully reserved the ticket
  AwaitingPayment: 'awaiting:payment',

  // The order has reserved the ticket and the user has
  // provided payment successfuly
  Complete: 'complete',
};

const orderSateIcon = (orderStatus) => {
  switch (orderStatus) {
    case OrderStatus.AwaitingPayment:
      return <HourglassBottomIcon />;
      break;
    case OrderStatus.Cancelled:
      return <DoNotDisturbAltIcon />;
      break;
    case OrderStatus.Complete:
      return <DoneIcon />;
      break;
    case OrderStatus.Created:
      return <CheckIcon />;
      break;

    default:
      break;
  }
};

const OrderIndex = ({ orders }) => {
  return (
    <Box>
      <List component="nav">
        {orders.map((order) => {
          return (
            <ListItem key={order.id}>
              <ListItemIcon>orderSateIcon(order.status)</ListItemIcon>
              <ListItemText primary={order.ticket.title} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
