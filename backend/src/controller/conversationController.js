const { Prisma } = require("@prisma/client");
const db = require("../model/conversationQueries");

class Conversation {
    async sendMessage(req, res, next) {
        try {
            await db.addMessageToConversation({ id: +req.params.id, senderId: req.user.id, message: req.body.message, isImage: req.body.isImage }); // isImage params is for gifs... I really dont want to make a mess and do another function

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async sendImage(req, res, next) {
        try {
            await db.addMessageToConversation({ id: +req.params.id, senderId: req.user.id, message: req.publicUrl, isImage: true });

            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async getConversation(req, res, next) {
        try {
            const convo = await db.getConversation({ id: +req.params.id });

            if (!convo) throw Error;

            return res.status(200).json({ convo });
        } catch (err) {
            next(err);
        }
    }

    async getPrivateConversation(req, res, next) {
        try {
            const convo = await db.getPrivateConversation({ id: req.user.id, username: req.params.username });

            res.status(200).json({ convo });
        } catch (err) {
            next(err);
        }
    }

    async createGroupConversation(req, res, next) {
        try {
            await db.createGroupConversation({ picture: req.publicUrl, name: req.body.name, ownerId: req.user.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async updateGroupConversation(req, res, next) {
        try {
            await db.editGroupConversation({ id: +req.params.id, picture: req.publicUrl, name: req.body.name });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async addUser(req, res, next) {
        try {
            await db.addUserToConversation({ id: +req.params.id, userId: req.body.userId });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async kickUser(req, res, next) {
        try {
            await db.kickUserFromConversation({ id: +req.params.id, userId: req.body.userId });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async leaveConversation(req, res, next) {
        try {
            await db.leaveConversation({ id: +req.params.id, userId: req.user.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async deleteConversation(req, res, next) {
        try {
            await db.deleteConversation({ id: +req.params.id, userId: req.user.id });

            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }

    async deleteMessage(req, res, next) {
        try {
            await db.deleteMessage({ id: +req.params.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new Conversation();
