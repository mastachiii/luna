const { PrismaClient } = require("@prisma/client");
const { checkIfUsersAlreadyHaveConvo, checkIfUserIsInConversation } = require("../helpers/conversationHelperQueries");

const prisma = new PrismaClient();

class Conversation {
    async createConversation({ id, id2 }) {
        const usersAlreadyHaveConvo = await checkIfUsersAlreadyHaveConvo({ id, id2 });

        if (usersAlreadyHaveConvo) return;

        await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id }, { id: id2 }],
                },
            },
        });
    }

    async createGroupConversation({ picture, name, ownerId }) {
        await prisma.conversation.create({
            data: {
                users: {
                    connect: {
                        id: ownerId,
                    },
                },
                isGroup: true,
                picture,
                name,
                ownerId,
            },
        });
    }

    async editGroupConversation({ id, name, picture }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                picture,
                name,
            },
        });
    }

    async addUserToConversation({ id, userId }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async kickUserFromConversation({ id, userId }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async leaveConversation({ id, userId }) {
        await prisma.conversation.update({
            where: { id },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async addMessageToConversation({ id, message, senderId, isImage }) {
        const userInConvo = await checkIfUserIsInConversation({ id, userId: senderId });

        if (!userInConvo) throw new Error();

        const conversation = await prisma.conversation.update({
            where: { id },
            data: {
                messages: {
                    create: {
                        message,
                        userId: senderId,
                        dateSent: new Date(),
                        isImage,
                    },
                },
            },
        });
    }

    async getConversation({ id }) {
        const conversation = await prisma.conversation.findUnique({
            where: { id },
            include: {
                messages: {
                    include: {
                        user: true,
                    },
                },
                users: {
                    select: {
                        username: true,
                        displayName: true,
                        id: true,
                        profilePicture: true,
                        bio: true,
                        backdrop: true,
                        online: true,
                    },
                    orderBy: {
                        displayName: "asc",
                    },
                },
            },
        });

        return conversation;
    }

    async getPrivateConversation({ id, username }) {
        const convo = await prisma.conversation.findFirst({
            where: {
                isGroup: false,
                AND: [
                    {
                        users: {
                            some: {
                                id,
                            },
                        },
                    },
                    {
                        users: {
                            some: {
                                username,
                            },
                        },
                    },
                ],
            },
            include: {
                messages: {
                    include: {
                        user: {
                            select: {
                                displayName: true,
                                username: true,
                                bio: true,
                                backdrop: true,
                                profilePicture: true,
                                id: true,
                            },
                        },
                    },
                    orderBy: {
                        dateSent: "asc",
                    },
                },
                users: {
                    where: { id },
                    select: {
                        displayName: true,
                        profilePicture: true,
                    },
                },
            },
        });

        return convo;
    }

    async deleteConversation({ id, userId }) {
        await prisma.conversation.delete({
            where: {
                id,
                ownerId: userId,
            },
        });
    }

    async deleteMessage({ id }) {
        await prisma.message.delete({
            where: { id },
        });
    }
}

module.exports = new Conversation();
