const db = require("../model/conversationQueries");

class Conversation {
    async sendMessage({ req, res, next }) {
        try {
            // db.addMessageToConversation
        } catch (err) {
            return res.sendStatus(400);
        }
    }
}

module.exports = new Conversation();
