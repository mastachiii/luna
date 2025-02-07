async function checkIfUsersAlreadyHaveConvo({ id, id2 }) {
    const query = await prisma.user.findUnique({
        where: {
            id,
            conversations: {
                some: {
                    users: {
                        some: {
                            id: id2,
                        },
                    },
                },
            },
        },
    });

    return query;
}

module.exports = { checkIfUsersAlreadyHaveConvo };
