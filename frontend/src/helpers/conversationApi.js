class Conversation {
    constructor() {
        this.conversationUrl = "https://luna-cu1p.onrender.com/conversation";
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

    async sendMessage({ id, message, isImage }) {
        await fetch(`${this.conversationUrl}/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, isImage }),
        });
    }

    sendImage({ id, image }) {
        if (image.type.split("/")[0] !== "image") return;

        const formData = new FormData();
        formData.append("file", image);

        fetch(`${this.conversationUrl}/image/${id}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    }

    async createGroupConversation({ image, name }) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("name", name);

        fetch(`${this.conversationUrl}/group`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    }

    async updateConversationInfo({ name, image, id }) {
        if (image.type.split("/")[0] !== "image") return;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("name", name);

        await fetch(`${this.conversationUrl}/group/${id}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    }

    async updateConversationMembers({ id, userId, action }) {
        fetch(`${this.conversationUrl}/group/${action === "kick" ? "remove" : "add"}/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });
    }

    async leaveConversation({ id }) {
        await fetch(`${this.conversationUrl}/group/leave/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }

    async deleteConversation({ id }) {
        await fetch(`${this.conversationUrl}/group/delete/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }

    async deleteMessage({ id }) {
        await fetch(`${this.conversationUrl}/delete/message/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }
}

export default new Conversation();
