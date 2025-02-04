const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class User {
    async createUser({ username, displayName, profilePicture }) {
        await prisma.user.create({
            data: {
                username,
                displayName,
                profilePicture,
            },
        });
    }
}
