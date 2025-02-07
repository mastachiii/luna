const { PrismaClient } = require("@prisma/client");
const { checkIfUsersAlreadyHaveConvo, checkIfUserIsInConversation } = require("../helpers/conversationHelperQueries");

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
        console.log({ id, message, senderId })
        const userInConvo = await checkIfUserIsInConversation({ id, userId: senderId });

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
}

const convo = new Conversation();

convo.createConversation({ id: 1, id2: 2 });

module.exports = new Conversation();
