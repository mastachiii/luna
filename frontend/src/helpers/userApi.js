class User {
    constructor() {
        this.signUpUrl = "http://localhost:8080/user/sign-up";
        this.logInUrl = "http://localhost:8080/user/log-in";
    }

    signUp({ username, email, password, passwordConfirm, displayName, errMessageHandler }) {
        fetch(this.signUpUrl, {
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
        fetch(this.logInUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then(response => console.log(response)).catch(err => {
            console.log(err);
        });
    }
}

export default new User();
