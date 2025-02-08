class User {
    constructor() {
        this.signUpUrl = "http://localhost:8080/sign-up";
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
                if (data.err) return errMessageHandler(data.message);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
