let request = require("supertest");

request = request("http://localhost:8080");
// Needs to be updated, just curl and copy paste from the cookie.txt file...
const audreyCookie = ["connect.sid=s%3AXmtz9yPaxBkaPV2IN-jakIeWOu4yVWNB.lmnCvNFKGRVvHuF1hJBOsI7uEy2piVtbzpZD7gVf4rw"];
const breezyCookie = ["connect.sid=s%3Ab_SseGxOMyqGh34IO8Z8o2pRAS-zGROJ.%2BoidrCarFHFwmMYuBzvPLQ%2Fd5zDVCxoYF6tlHEPSpgY"];

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
        request.post("/user/add/1").set("Cookie", breezyCookie).expect(400, done);
    });

    it("Rejects if user tries to add a non-existing user", done => {
        request.post("/user/add/1000000").set("Cookie", breezyCookie).expect(400, done);
    });

    it("Adds user", done => {
        request.post("/user/add/1").set("Cookie", audreyCookie).expect(200, done);
    });
});

describe("When user tries to accept/reject another user", () => {
    it("Rejects if user accepts non-existent request", done => {
        request.post("/user/accept/100").set("Cookie", breezyCookie).expect(400, done);
    });

    it("Rejects if user rejects non-existent request", done => {
        request.post("/user/reject/100").set("Cookie", breezyCookie).expect(400, done);
    });

    it("Rejects if user accepts non-existent request", done => {
        request.post("/user/accept/100").set("Cookie", breezyCookie).expect(400, done);
    });

    it("Rejects a friend request", done => {
        request
            .post("/user/reject/3")
            .set("Cookie", breezyCookie)
            .expect(200)
            .then(response => {
                expect(response.body.user.requestsReceived.length).toBe(0);

                done();
            });
    });

    xit("Accepts friend request and creates a initial conversation", done => {
        request
            .post("/user/accept/3")
            .set("Cookie", breezyCookie)
            .expect(200, done)
            .then(response => {
                expect(response.body.user.conversations.length).toBe(1);

                done();
            });
    });
});
