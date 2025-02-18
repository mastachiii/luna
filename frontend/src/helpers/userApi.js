import { da } from "date-fns/locale";

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
                localStorage.setItem("user", JSON.stringify(data.user));
            })
            .catch(err => {
                errorHandler(true);
                statusHandler("");

                console.log(err);
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
            response.status === 400 ? statusHandler("FAILED") : statusHandler("OKAY");
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
            .then(data => data);

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

    updateProfile({ displayName, profilePicture }) {
        const formData = new FormData();

        formData.append("file", profilePicture);
        formData.append("displayName", displayName);

        fetch(`${this.userUrl}/profile`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
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

    foo() {
        fetch("http://localhost:8080", {
            credentials: "include",
        });
    }
}

export default new User();
