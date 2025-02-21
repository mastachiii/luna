function checkIfUserIsInConversation({ conversationUsers, userId }) {
    return conversationUsers.find(u => u.id === userId);
}

export { checkIfUserIsInConversation }
