"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQService {
    constructor() {
        this.init();
    }
    async init() {
        // Establish connection to RabbitMQ server
        this.connection = await amqplib_1.default.connect(process.env.MESSAGE_BROKER_URL);
        this.channel = await this.connection.createChannel();
        // Asserting queues ensures they exist
        await this.channel.assertQueue(this.requestQueue);
        await this.channel.assertQueue(this.responseQueue);
        // Start listening for messages on the request queue
        this.listenForRequests();
    }
    async listenForRequests() {
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
//# sourceMappingURL=rabbitMQService.js.map