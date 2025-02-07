let request = require("supertest");

request = request("http://localhost:8080");

describe("User adds a message to conversation", () => {
    it("Throws if conversation does not exist", done => {
        request.post("/conversation/iDoNotExist").send({ message: "foo" }).expect(400, done);
    });

    it("Sends message", () => {
        request.post("/conversation/audreyHepburn123").send({ message: "Hi" }).expect(200, done);
    });
});
