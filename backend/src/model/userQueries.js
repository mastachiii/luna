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
    async addUser({ id, username }) {
        await prisma.user.update({
            where: { id },
            data: {
                requestsSent: {
                    connect: {
                        username,
                    },
                },
            },
        });

        await prisma.user.update({
            where: { username },
            data: {
                requestsReceived: {
                    connect: {
                        id,
                    },
                },
            },
        });
    }

    async getUser({ id }) { }
}

const user = new User();

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
