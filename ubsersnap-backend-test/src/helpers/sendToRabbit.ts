import amqp from 'amqplib/callback_api.js'

const sendToQueue = async (queueName: string, content: any) => {
    const rabbitUrl: string = process.env.RABBIT_HOST || 'amqp://guest:guest@localhost:5672'
    amqp.connect(rabbitUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = queueName;
            var payload = JSON.stringify(content);

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(payload));
            console.log(`success to send`);
        });
    });
}

export {
    sendToQueue
}