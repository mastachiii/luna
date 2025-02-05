const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Conversation {
    async createConversation({ userIds }) {
        const ids = userIds.map(u => ({
            id: u,
        }));

        await prisma.conversation.create({
            data: {
                users: {
                    connect: ids,
                },
            },
        });
    }

    async addMessageToConversation({ id, message, senderId }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                messages: {
                    create: {
                        message,
                        userId: senderId,
                        dateSent: new Date(),
                    },
                },
            },
        });
    }
}

const convo = new Conversation();


module.exports = new Conversation();
