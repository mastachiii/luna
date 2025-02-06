const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

// A bunch of verification queries to run before adding a user
async function validateAddUser({ id, receiverId }) {
    const isFriend = await prisma.user.findUnique({
        where: { id, friends: { some: { id: receiverId } } },
    });

    // const requestAlreadySent = await prisma.user.findUnique({
    //     where: { id, requestsSent: { some: { id: receiverId } } },
    // });

    // Incase some guy tries to add themselves
    const isSelf = id === receiverId;

    return !isFriend && !isSelf;
}

module.exports = { validateAddUser };
