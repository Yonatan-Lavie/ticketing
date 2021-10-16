import Queue from 'bull';

interface Payload {
    orderId: string,
}

const expiretionQueue = new Queue<Payload>('order: expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expiretionQueue.process( async (job) => {
    console.log(
    'I want to publish an expiration:complete event for orderId',
     job.data.orderId)
     ;
});

export { expiretionQueue };
