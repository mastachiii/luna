let request = require("supertest");

request = request("http://localhost:8080");

describe("User routes & controllers work properly", () => {
    it("Handles sign up requests properly", done => {
        request
            .post("/user/sign-up")
            .send({
                username: "audreyHepburn123",
                email: "hepburn@hotmail.com",
                password: "alsaliasid12",
                passwordConfirm: "alsaliasid12",
                displayName: "audrey",
            })
            .expect(201);
    });

    it("Handles log in requests properly", done => {
        request.post("/user/log-in").send({ username: "breezy_786", password: "alsaliasid12" }).expect(200);

        request.post("/user/log-in").send({ username: "userThatDoesntExist", password: "foo" }).expect(401, done);
    });
});
