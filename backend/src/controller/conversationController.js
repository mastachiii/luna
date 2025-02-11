const db = require("../model/conversationQueries");
const { createClient } = require("@supabase/supabase-js");
const { decode } = require("base64-arraybuffer");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

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
            const file = decode(req.file.buffer.toString("base64"));
            const path = `${req.user.username}/${req.file.originalname.toLowerCase()}`;

            await supabase.storage.from("luna").upload(path, file, {
                contentType: "image",
            });

            const { data } = await supabase.storage.from("luna").getPublicUrl(path);
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
