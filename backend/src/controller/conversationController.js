const db = require("../model/conversationQueries");

class Conversation {
    async sendMessage(req, res, next) {
        try {
            await db.addMessageToConversation({ id: +req.params.id, senderId: req.user.id, message: req.body.message });

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
            await db.createGroupConversation({ userIds: [...req.body.userIds, req.user.id] });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async deleteConversation(req, res, next) {
        try {
            await db.deleteConversation({ id: +req.params.id, userId: req.body.id });

            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new Conversation();
