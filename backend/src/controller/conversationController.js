const db = require("../model/conversationQueries");

class Conversation {
    async sendMessage(req, res, next) {
        try {
            await db.addMessageToConversation({ id: +req.params.id, senderId: req.body.id, message: req.body.message });

            return res.sendStatus(200);
        } catch (err) {
            return res.sendStatus(400);
        }
    }

    async getConversation(req, res, next) {
        try {
            const convo = await db.getConversation({ id: +req.params.id });

            if (!convo) throw Error

            return res.status(200).json({ convo });
        } catch (err) {
            return res.sendStatus(404);
        }
    }
}

module.exports = new Conversation();
