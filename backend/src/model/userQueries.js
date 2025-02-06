const { PrismaClient, Prisma } = require("@prisma/client");
const conversation = require("./conversationQueries");
const { validateAddUser, validateFriendRequest } = require("../helpers/userHelperQueries");

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

        return user;
    }

    async acceptUser({ id, senderId }) {
        const reqValid = await validateFriendRequest({ id, senderId });

        if (!reqValid) throw new Error();

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

        await conversation.createConversation({ userIds: [id, senderId] });
    }

    async rejectUser({ id, senderId }) {
        const reqValid = await validateFriendRequest({ id, senderId });

        if (!reqValid) throw new Error();

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
                            include: {
                                user: true,
                            },
                        },
                        users: true,
                    },
                },
            },
        });

        return user;
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

    // A helper for the adding user function, checks if user is already friends with the user that they're trying to add.
    async checkUserIsFriend({ id, friendId }) {
        const user = await prisma.user.findUnique({
            where: { id, friends: { some: { id: friendId } } },
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
    // await user.acceptUser({ id: 2, senderId: 1 });
    // await user.checkUserIsFriend({ id: 1, receiverId: 3 })
    // await user.getUser({ username: "mastachii273" });
})();

module.exports = new User();
