"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const uuid_1 = require("uuid");
class RabbitMQService {
    constructor() {
        this.requestQueue = "USER_DETAILS_REQUEST";
        this.responseQueue = "USER_DETAILS_RESPONSE";
        this.notificationsQueue = "NOTIFICATIONS";
        this.correlationMap = new Map();
        this.init();
    }
    async init() {
        const connection = await amqplib_1.default.connect(process.env.MESSAGE_BROKER_URL);
        this.channel = await connection.createChannel();
        await this.channel.assertQueue(this.requestQueue);
        await this.channel.assertQueue(this.responseQueue);
        this.channel.consume(this.responseQueue, (msg) => {
            if (msg) {
                const correlationId = msg.properties.correlationId;
                const user = JSON.parse(msg.content.toString());
                const callback = this.correlationMap.get(correlationId);
                if (callback) {
                    callback(user);
                    this.correlationMap.delete(correlationId);
                }
            }
        }, { noAck: true });
    }
    async requestUserDetails(userId, callback) {
        const correlationId = (0, uuid_1.v4)();
        this.correlationMap.set(correlationId, callback);
        this.channel.sendToQueue(this.requestQueue, Buffer.from(JSON.stringify({ userId })), { correlationId });
    }
    async notifyReceiver(receiverId, messageContent, senderEmail, senderName) {
        await this.requestUserDetails(receiverId, async (user) => {
            const notificationPayload = {
                type: "MESSAGE_RECEIVED",
                userId: receiverId,
                userEmail: user.email,
                message: messageContent,
                from: senderEmail,
                fromName: senderName,
            };
            try {
                await this.channel.assertQueue(this.notificationsQueue);
                this.channel.sendToQueue(this.notificationsQueue, Buffer.from(JSON.stringify(notificationPayload)));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
//# sourceMappingURL=rabbitMQService.js.map