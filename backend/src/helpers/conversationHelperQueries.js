const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkIfUsersAlreadyHaveConvo({ id, id2 }) {
    const query = await prisma.user.findUnique({
        where: {
            id,
            conversations: {
                some: {
                    users: {
                        some: {
                            id: id2,
                        },
                    },
                },
            },
        },
    });

    return query;
}

async function getConversationId({ username1, username2 }) {
    const query = await prisma.conversation.findFirst({
        where: {
            AND: [
                {
                    users: {
                        some: {
                            username: username1,
                        },
                    },
                },
                {
                    users: {
                        some: {
                            username: username2,
                        },
                    },
                },
            ],
        },
    });

    return query
}

getConversationId({ username1: "breezy_786", username2: "audreyHepburn123" });

module.exports = { checkIfUsersAlreadyHaveConvo };
