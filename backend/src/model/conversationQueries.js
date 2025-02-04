const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Conversation {
    // Creates a conversation only between two friends
    async createFriendConversation({ userOneId, userTwoId }) {
        await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: userOneId,
                        },
                        {
                            id: userTwoId,
                        },
                    ],
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
