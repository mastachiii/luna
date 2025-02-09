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

    async sendMessage({ id, message }) {
        await fetch(`${this.conversationUrl}/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
    }
}

export default new Conversation();
