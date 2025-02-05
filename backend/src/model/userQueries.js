const { PrismaClient } = require("@prisma/client");
const conversation = require("./conversationQueries");

const prisma = new PrismaClient();

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
        const isFriend = await this.checkUserIsFriend({
            id,
            friendId: receiverId,
        });

        if (isFriend) throw new Error("Already Friends");

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
    }

    async acceptUser({ id, senderId }) {
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

    async getUser({ username }) {
        const user = await prisma.user.findUnique({
            where: { username },
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
        debugger;
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
    await user.getUser({ username: "mastachii273" });
})();
