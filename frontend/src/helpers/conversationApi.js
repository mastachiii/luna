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

    async getGroupChat({ id }) {
        const chat = await fetch(`${this.conversationUrl}/${id}`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => data);

        return chat;
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

    async sendImage({ id, image }) {
        if (image.type.split("/")[0] !== "image") return;

        const formData = new FormData();
        formData.append("file", image);

        fetch(`${this.conversationUrl}/image/${id}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    }

    async createGroupConversation({ userIds }) {
        fetch(`${this.conversationUrl}/group`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userIds }),
        });
    }
}

export default new Conversation();
