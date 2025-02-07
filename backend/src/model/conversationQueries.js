const { PrismaClient } = require("@prisma/client");
const { checkIfUsersAlreadyHaveConvo } = require("../helpers/conversationHelperQueries");

const prisma = new PrismaClient();

class Conversation {
    async createConversation({ id, id2 }) {
        const usersAlreadyHaveConvo = await checkIfUsersAlreadyHaveConvo({ id, id2 });

        if (usersAlreadyHaveConvo) return;

        await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id }, { id: id2 }],
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

        return convo;
    }
}

const convo = new Conversation();

convo.createConversation({ id: 1, id2: 2 });

module.exports = new Conversation();
