let request = require("supertest");

request = request("http://localhost:8080");

describe("Login requests", () => {
    it("Handles log in requests properly", done => {
        request.post("/user/log-in").send({ username: "breezy_786", password: "alsaliasid12" }).expect(200);

        request.post("/user/log-in").send({ username: "userThatDoesntExist", password: "foo" }).expect(401, done);
    });
});

xdescribe("Sign up requests", () => {
    it("Handles sign up requests properly", done => {
        request
            .post("/user/sign-up")
            .send({
                username: "breezy_786",
                email: "mastachii273@gmail.com",
                password: "alsaliasid12",
                passwordConfirm: "alsasad1233",
                displayName: "failed",
            })
            .expect(401)
            .then(response => {
                expect(response.body.errors.length).toBe(3);
            });

        request
            .post("/user/sign-up")
            .send({
                username: "audreyHepburn123",
                email: "hepburn@hotmail.com",
                password: "alsaliasid12",
                passwordConfirm: "alsaliasid12",
                displayName: "audrey",
            })
            .expect(201, done);
    });
});

describe("When user tries to add someone", () => {
    const cookie = ["connect.sid=s%3A_IUtGn7da4b_uKCHfvo-Jnv6EFze_mgV.mEfI4e9yj7pm5JgfobpV9zevtKSFu2iPp7UTf4XUYV0"];

    it("Rejects if user tries to add themselves", done => {
        request.post("/user/add/9").set("Cookie", cookie).expect(400, done);
    });
});
