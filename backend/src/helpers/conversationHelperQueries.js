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

async function checkIfUserIsInConversation({ id, userId }) {
    const convo = await prisma.conversation.findUnique({
        where: { id, users: { some: { id: userId } } },
    });
    console.log(convo);
    return convo;
}


module.exports = { checkIfUsersAlreadyHaveConvo, checkIfUserIsInConversation };
