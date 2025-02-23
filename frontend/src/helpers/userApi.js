class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user";
    }

    signUp({ username, email, password, passwordConfirm, displayName, errMessageHandler, statusHandler }) {
        fetch(`${this.userUrl}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, passwordConfirm, displayName }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.err) {
                    statusHandler("");

                    const errors = {};
                    data.errors.map(err => (errors[err.path] = err.msg));

                    return errMessageHandler(errors);
                } else {
                    window.location.href = "/log-in";
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    logIn({ username, password, errorHandler, statusHandler }) {
        fetch(`${this.userUrl}/log-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = "/";
            })
            .catch(err => {
                errorHandler(true);
                statusHandler("");

                console.log(err);
            });
    }

    logOut() {
        fetch(`${this.userUrl}/log-out`, {
            method: "POST",
            credentials: "include",
        }).then(() => {
            window.location.href = "/log-in";
        });
    }

    async addFriend({ username, statusHandler }) {
        await fetch(`${this.userUrl}/add/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ receiverUsername: username }),
        }).then(response => {
            response.status === 400 && statusHandler ? statusHandler("FAILED") : statusHandler("OKAY");
        });
    }

    acceptRequest({ id }) {
        fetch(`${this.userUrl}/accept/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }

    removeFriend({ id }) {
        fetch(`${this.userUrl}/remove/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }

    rejectRequest({ id }) {
        fetch(`${this.userUrl}/reject/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }

    cancelRequest({ id }) {
        fetch(`${this.userUrl}/cancel/${id}`, {
            method: "POST",
            credentials: "include",
        });
    }

    async getUserData() {
        const { user } = await fetch(this.userUrl, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Unauthorized") return (window.location.href = "/log-in");

                return data;
            });

        return user;
    }

    async getAvailableUsers() {
        const { users } = await fetch(`${this.userUrl}/users`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => data);

        return users;
    }

    async updateProfile({ displayName, profilePicture, backdrop, profilePicGif = "", backdropGif = "", bio, saveHandler }) {
        const formData = new FormData();

        formData.append("displayName", displayName);
        formData.append("profilePicture", profilePicture);
        formData.append("backdrop", backdrop);
        formData.append("bio", bio);
        formData.append("profilePicGif", profilePicGif);
        formData.append("backdropGif", backdropGif);

        await fetch(`${this.userUrl}/profile`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        saveHandler(true);
    }

    goOnline() {
        fetch(this.userUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ status: "online" }),
        });
    }

    goOffline() {
        fetch(this.userUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ status: "offline" }),
        });
    }
}

export default new User();
