import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });
  return (
    <Grid item key={ticket} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {ticket.title}
          </Typography>
          <Typography>Price: {ticket.price}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => doRequest()} size="small">
            Purchase
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

TicketShow.getInitialProps = async (contex, client) => {
  const { ticketId } = contex.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
