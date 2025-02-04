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
}

const convo = new Conversation();

convo.createFriendConversation({ userOneId: 1, userTwoId: 2 });

module.exports = new Conversation();
