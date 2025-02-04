const { PrismaClient } = require("@prisma/client");

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

    // Update the user requests first then update the user who will receive that request...
    // TODO: Handle edge case when user tries to add an existing friend..
    async addUser({ id, receiverId }) {
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
    }

    async getUser({ username }) {
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                friends: true,
                requestsSent: true,
                requestsReceived: true,
            },
        });

        return user;
    }
}

const user = new User();

user.getUser({ username: "mastachii273" });
// user.addUser({ id: "103febb0-5b70-43d1-8c03-47aaba751ee1", username: "Midori" });
// user.acceptUser({ id: "0b150dba-1d81-402f-8737-6afc9d5041cf", senderUsername: "mastachii273" });

// user.createUser({
//     username: "mastachii273",
//     email: "mastachii273@gmail.com",
//     password: "alsaliasid12",
//     displayName: "machii",
// });

// user.createUser({
//     username: "Midori",
//     email: "midori@gmail.com",
//     password: "alsaliasid12",
//     displayName: "midori :-)",
// });
