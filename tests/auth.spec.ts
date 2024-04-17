import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../server";
import { describe } from "mocha";

const should = chai.should();

chai.use(chaiHttp);

describe("POST /login", () => {
  let customerData = {
    body: {
      username: "test@gmail.com",
      password: "12345",
    },
  };

  it("should login", (done) => {
    chai
      .request(app)
      .post("auth/login")
      .send(customerData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
