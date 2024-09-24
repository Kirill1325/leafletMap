import 'dotenv/config'
import amqp, { Channel, Connection } from "amqplib";
class RabbitMQService {

    private requestQueue: ''
    private responseQueue: ''

    private connection!: Connection;
    private channel!: Channel;

    constructor() {
        this.init();
    }

    async init() {
        // Establish connection to RabbitMQ server
        this.connection = await amqp.connect(process.env.MESSAGE_BROKER_URL);
        this.channel = await this.connection.createChannel();

        // Asserting queues ensures they exist
        await this.channel.assertQueue(this.requestQueue);
        await this.channel.assertQueue(this.responseQueue);

        // Start listening for messages on the request queue
        this.listenForRequests();
    }

    private async listenForRequests() {
        this.channel.consume(this.requestQueue, async (msg) => {
            if (msg && msg.content) {
                
                // const { userId } = JSON.parse(msg.content.toString());
                // const userDetails = await getUserDetails(userId);

                // Send the user details response
                // this.channel.sendToQueue(
                    // this.responseQueue,
                    // Buffer.from(JSON.stringify(userDetails)),
                    // { correlationId: msg.properties.correlationId }
                // );

                // Acknowledge the processed message
                this.channel.ack(msg);
            }
        });
    }

}