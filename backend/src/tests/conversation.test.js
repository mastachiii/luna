let request = require("supertest");

request = request("http://localhost:8080");

describe("User adds a message to conversation", () => {
    it("Throws if conversation does not exist or user is not in conversation", done => {
        request.post("/conversation/1000000").send({ id: 1, message: "foo" }).expect(400, done);
    });

    it("Sends message", done => {
        request.post("/conversation/1").send({ id: 2, message: "Yoooow" }).expect(200, done);
    });
});

describe("User gets conversation", () => {
    it("Throws if conversation does not exist", done => {
        request.get("/conversation/10000000").expect(404, done);
    });

    it("Returns conversation", done => {
        request.get("/conversation/1").expect("Content-Type", /json/).expect(200, done);
    });
});
