const { PrismaClient, Prisma } = require("@prisma/client");
const conversation = require("./conversationQueries");
const { validateAddUser, validateFriendRequest, checkIfUserAreFriends } = require("../helpers/userHelperQueries");

const databaseUrl = process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

class User {
    async createUser({ username, email, password, displayName, profilePicture }) {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                displayName,
                profilePicture,
            },
        });

        return user;
    }

    // Update the user requests sent first then update the user who will receive that request...
    async addUser({ id, receiverId }) {
        const verifyReq = await validateAddUser({ id, receiverId });

        if (!verifyReq)
            throw new Error(
                "Request rejected. Are you sure that you haven't sent a request already or that you're not friends with the one you're trying to add?"
            );

        await prisma.user.update({
            where: { id },
            data: {
                requestsSent: {
                    connect: {
                        id: receiverId,
                    },
                },
            },
        });

        await prisma.user.update({
            where: { id: receiverId },
            data: {
                requestsReceived: {
                    connect: {
                        id,
                    },
                },
            },
        });

        return;
    }

    async acceptUser({ id, senderId }) {
        const reqValid = await validateFriendRequest({ id, senderId });

        if (!reqValid) throw new Error("Request is not valid");

        await prisma.user.update({
            where: { id },
            data: {
                friends: {
                    connect: {
                        id: senderId,
                    },
                },
                requestsReceived: {
                    disconnect: {
                        id: senderId,
                    },
                },
            },
        });

        await prisma.user.update({
            where: { id: senderId },
            data: {
                friends: {
                    connect: {
                        id,
                    },
                },
                requestsSent: {
                    disconnect: {
                        id,
                    },
                },
            },
        });

        // await conversation.createConversation({ id: id, id2: senderId });
    }

    async rejectUser({ id, senderId }) {
        const reqValid = await validateFriendRequest({ id, senderId });

        if (!reqValid) throw new Error("Request is not valid");

        await prisma.user.update({
            where: { id },
            data: {
                requestsReceived: {
                    disconnect: {
                        id: senderId,
                    },
                },
            },
        });

        await prisma.user.update({
            where: { id: senderId },
            data: {
                requestsSent: {
                    disconnect: {
                        id,
                    },
                },
            },
        });
    }

    async removeFriend({ id, friendId }) {
        const isFriends = checkIfUserAreFriends({ id, friendId });

        if (!isFriends) throw new Error("Users are not friends");

        await prisma.user.update({
            where: { id },
            data: {
                friends: {
                    disconnect: {
                        id: friendId,
                    },
                },
            },
        });

        await prisma.user.update({
            where: { id: friendId },
            data: {
                friends: {
                    disconnect: {
                        id,
                    },
                },
            },
        });
    }

    async modifyUserStatus({ id, isOnline }) {
        await prisma.user.update({
            where: { id },
            data: {
                online: isOnline === "online",
            },
        });
    }

    async getUser({ id }) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                friends: true,
                requestsSent: true,
                requestsReceived: true,
                conversations: {
                    include: {
                        messages: {
                            orderBy: {
                                dateSent: "desc",
                            },
                            include: {
                                // user: true,
                            },
                        },
                    },
                },
            },
        });

        return user;
    }

    async getUserId({ username }) {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        return user.id;
    }

    async getUserByEmail({ email }) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }

    async getUserByUsername({ username }) {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        return user;
    }
}

const user = new User();

(async () => {
    // user.checkUserIsFriend({ id: 1, friendId: 2 });
    // await user.createUser({
    //     username: "mastachii273",
    //     email: "mastachii273@gmail.com",
    //     password: "alsaliasid12",
    //     displayName: "machii",
    // });
    // await user.createUser({
    //     username: "Midori",
    //     email: "midori@gmail.com",
    //     password: "alsaliasid12",
    //     displayName: "midori :-)",
    // });
    // await user.createUser({
    //     username: "alAsid2006",
    //     email: "jpinkman378@gmail.com",
    //     password: "alsaliasid12",
    //     displayName: "AL",
    // });
    // await user.addUser({ id: 1, receiverId: 2 });
    // await user.acceptUser({ id: 1, senderId: 2 });
    // await user.checkUserIsFriend({ id: 1, receiverId: 3 })
    // console.dir(await user.getUser({ id: 1 }), { depth: null });
})();

module.exports = new User();
