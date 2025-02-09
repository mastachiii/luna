const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkIfUserAreFriends({ id, friendId }) {
    const isFriend = await prisma.user.findUnique({
        where: { id, friends: { some: { id: friendId } } },
    });

    return isFriend;
}

async function validateAddUser({ id, receiverId }) {
    const isFriend = await checkIfUserAreFriends({ id, friendId: receiverId });

    // Checks if receiver already sent a friend request to user
    const receiverSentRequest = await prisma.user.findUnique({
        where: { id, requestsReceived: { some: { id: receiverId } } },
    });

    const isExist = await prisma.user.findUnique({
        where: { id: receiverId },
    });

    // Incase some guy tries to add themselves
    const isSelf = id === receiverId;

    return !isFriend && !isSelf && !receiverSentRequest && isExist;
}

async function validateFriendRequest({ id, senderId }) {
    const reqIsValid = await prisma.user.findUnique({
        where: {
            id,
            requestsReceived: {
                some: {
                    id: senderId,
                },
            },
        },
    });

    return reqIsValid;
}

(async () => {
    const query = await prisma.user.findMany({
        include: {
            conversations: {
                include: {
                    messages: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            friends: true,
            requestsReceived: true,
            requestsSent: true,
        },
    });
    // checkIfUserAreFriends({ id: 2, friendId: 2 });
    // validateFriendRequest({ id: 1, senderId: 2 })
    // console.dir(query, { depth: null });
})();

module.exports = { validateAddUser, validateFriendRequest, checkIfUserAreFriends };
