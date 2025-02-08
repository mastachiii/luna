class User {
    constructor() {
        this.userUrl = "http://localhost:8080/user/";
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
        fetch(`${this.userUrl}/sign-up`, {
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
            body: JSON.stringify({ username }),
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

    foo() {
        fetch("http://localhost:8080", {
            credentials: "include",
        });
    }
}

export default new User();
