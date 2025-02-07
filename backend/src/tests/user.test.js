// MAKE SURE TEST DB IS BLANK AND INITIALIZED WITH ONE ACC
// curl --request POST --header "Content-Type: application/json" --data '{"username":"breezy_786", "email":"mastachii273@gmail.com", "password":"alsaliasid12", "passwordConfirm": "alsaliasid12", "displayName": "breezy" }' localhost:8080/user/sign-up

let request = require("supertest");

request = request("http://localhost:8080");

xdescribe("Login requests", () => {
    it("Rejects if user already exists", done => {
        request.post("/user/log-in").send({ username: "breezy_786", password: "alsaliasid12" }).expect(200, done);
    });

    it("Logs user in", done => {
        request.post("/user/log-in").send({ username: "userThatDoesntExist", password: "foo" }).expect(401, done);
    });
});

xdescribe("Sign up requests", () => {
    it("Rejects if sign up form is invalid", done => {
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

                done();
            });
    });

    it("Creates user", done => {
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

xdescribe("When user tries to add someone", () => {
    it("Rejects if user tries to add themselves", done => {
        request.post("/user/add/1").send({ id: 1 }).expect(400, done);
    });

    it("Rejects if user tries to add a non-existing user", done => {
        request.post("/user/add/1000000").send({ id: 1 }).expect(400, done);
    });

    it("Adds user", done => {
        request.post("/user/add/1").send({ id: 2 }).expect(200, done);
    });
});

xdescribe("When user tries to accept/reject another user", () => {
    xit("Rejects if user accepts non-existent request", done => {
        request.post("/user/accept/100").send({ id: 1 }).expect(400, done);
    });

    xit("Rejects if user rejects non-existent request", done => {
        request.post("/user/reject/100").send({ id: 1 }).expect(400, done);
    });

    xit("Rejects if user accepts non-existent request", done => {
        request.post("/user/accept/100").send({ id: 1 }).expect(400, done);
    });

    xit("Rejects a friend request", done => {
        request.post("/user/reject/2").send({ id: 1 }).expect(200, done);
    });

    xit("Adds after being rejected", done => {
        request.post("/user/add/1").send({ id: 2 }).expect(200, done);
    });

    it("Accepts friend request and creates a initial conversation", done => {
        request.post("/user/accept/2").send({ id: 1 }).expect(200, done);
    });
});

xdescribe("Remove a friend", () => {
    it("Throws if user tries to remove a non-existing friend", done => {
        request.post("/user/remove/100").send({ id: 1 }).expect(400, done);
    });

    it("Removes a friend", done => {
        request.post("/user/remove/2").send({ id: 1 }).expect(200, done);
    });

    it("Can still add removed friend", done => {
        request.post("/user/add/1").send({ id: 2 }).expect(200, done);
    });
});
