class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user";
    }

    signUp({ username, email, password, passwordConfirm, displayName, errMessageHandler }) {
        fetch(`${this.userUrl}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, passwordConfirm, displayName }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.err) return errMessageHandler(data.errors);
            })
            .catch(err => {
                console.log(err);
            });
    }

    logIn({ username, password }) {
        fetch(`${this.userUrl}/log-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        })
            .then(response => console.log(response))
            .catch(err => {
                console.log(err);
            });
    }

    addFriend({ username }) {
        fetch(`${this.userUrl}/add/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ receiverUsername: username }),
        });
    }

    acceptRequest({ id }) {
        fetch(`${this.userUrl}/accept/${id}`, {
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

    async getUserData() {
        const { user } = await fetch(this.userUrl, {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => data);

        return user;
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

    foo() {
        fetch("http://localhost:8080", {
            credentials: "include",
        });
    }
}

export default new User();
