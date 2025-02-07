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

    async createGroupConversation({ userIds }) {
        const ids = userIds.map(id => ({ id }));

        console.log(ids);
    }

    async addMessageToConversation({ id, message, senderId }) {
        const userInConvo = await checkIfUserIsInConversation({ id, userId: senderId });

        if (!userInConvo) throw new Error();

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

    async getConversation({ id }) {
        const conversation = await prisma.conversation.findUnique({
            where: { id },
            include: {
                messages: {
                    include: {
                        user: true,
                    },
                },
                users: true,
            },
        });

        console.dir({ conversation }, { depth: null });

        return conversation;
    }
}

const convo = new Conversation();

module.exports = new Conversation();
