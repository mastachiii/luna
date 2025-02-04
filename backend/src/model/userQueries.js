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
}

const user = new User();

user.createUser({
    username: "mastachii273",
    email: "mastachii273@gmail.com",
    password: "alsaliasid12",
    displayName: "machii",
});
