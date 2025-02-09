class Conversation {
    constructor() {
        this.conversationUrl = "http://localhost:8080/conversation";
    }

    async getConversation({ username }) {
        const convo = await fetch(`${this.conversationUrl}/private/${username}`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => data);

        return convo;
    }
}

export default new Conversation();
