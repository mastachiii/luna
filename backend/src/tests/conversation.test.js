let request = require("supertest");

request = request("http://localhost:8080");

describe("User adds a message to conversation", () => {
    it("Throws if conversation does not exist or user is not in conversation", done => {
        request.post("/conversation/1000000").send({ id: 1, message: "foo" }).expect(400, done);
    });

    it("Sends message", done => {
        request.post("/conversation/1").send({ id: 1, message: "Hi" }).expect(200, done);
    });
});
