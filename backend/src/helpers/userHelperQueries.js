const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
// A bunch of verification queries to run before adding a user

async function checkIfUserAreFriends({ id, friendId }) {
    const isFriend = await prisma.user.findUnique({
        where: { id, friends: { some: { id: friendId } } },
    });

    return isFriend;
}

async function validateAddUser({ id, receiverId }) {
    const isFriend = checkIfUserAreFriends({ id, friendId: receiverId });

    const isExist = await prisma.user.findUnique({
        where: { id: receiverId },
    });

    // Incase some guy tries to add themselves
    const isSelf = id === receiverId;

    return !isFriend && !isSelf && isExist;
}

async function validateFriendRequest({ id, senderId }) {
    const reqIsValid = await prisma.user.findUnique({
        where: { id, requestsReceived: { some: { id: senderId } } },
    });

    console.log(reqIsValid)

    return reqIsValid;
}

(async () => {
    const query = await prisma.user.findMany({
        include: {
            conversations: true,
            friends: true,
            requestsReceived: true,
            requestsSent: true,
        },
    });
    console.log(query)
    // console.dir(query, { depth: null });
})();

module.exports = { validateAddUser, validateFriendRequest, checkIfUserAreFriends };
