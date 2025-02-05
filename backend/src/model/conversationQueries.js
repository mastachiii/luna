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
        const userInConvo = await this.checkIfUserIsInConversation({ id, userId: senderId });

        if (!userInConvo) throw new Error("401: Unauthorized");

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

    async checkIfUserIsInConversation({ id, userId }) {
        const convo = await prisma.conversation.findUnique({
            where: { id, users: { some: { id: userId } } },
        });
        console.log(convo);
        return convo;
    }
}

const convo = new Conversation();

module.exports = new Conversation();
