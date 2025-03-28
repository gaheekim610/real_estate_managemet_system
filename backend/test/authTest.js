const chai = require("chai"); // Assertion library used for writing test cases
const sinon = require("sinon"); // Library used for mocking/stubbing functions
const mongoose = require("mongoose"); // To generate mock ObejctId value
const { registerUser } = require("../controllers/authController");
const { expect } = chai;
// Import User
const User = require("../models/User");
// Import function

const jwt = require("jsonwebtoken");

describe("Auth Controller - Create Individual User(Signup)", () => {
  it("should create a user successfully", async () => {
    // Stub JWT token
    const tokenStub = sinon.stub(jwt, "sign").returns("mocked-token");

    // Mock request data
    const req = {
      // user: { id: new mongoose.Types.ObjectId() },
      body: {
        name: "test",
        email: "test@test.com",
        password: "Test1333",
        role: "individual",
        agentname: "",
        agentcode: "",
      },
    };
    // Mock task that would be created

    _id = new mongoose.Types.ObjectId();

    const createdUser = {
      _id,
      id: _id.toString(),
      ...req.body,
    };

    // Stub User create to return the createdUser
    const createStub = sinon.stub(User, "create").resolves(createdUser);
    const findOneStub = sinon.stub(User, "findOne").resolves(null);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call function
    await registerUser(req, res);

    console.log("res.json call arg:", res.json.getCall(0).args[0]);

    // Assertions
    expect(createStub.calledOnceWith(req.body)).to.be.true;
    expect(findOneStub.calledOnceWith({ email: req.body.email })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(
      res.json.calledWithMatch({
        id: sinon.match.any,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        agentname: req.body.agentname,
        agentcode: req.body.agentcode,
        token: sinon.match.string,
      })
    ).to.be.true;

    // Restore stubbed methods
    createStub.restore();
    findOneStub.restore();
    tokenStub.restore();
  });

  it("should throw an error if required fields are missing", async () => {
    // Test logic for missing fields
    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const findOneStub = sinon.stub(User, "findOne").resolves(null);
    const createStub = sinon.stub(User, "create");

    await registerUser(req, res);

    expect(res.status.called).to.be.true;
    expect(res.status.getCall(0).args[0]).to.be.oneOf([400, 500]);
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.getCall(0).args[0]).to.have.property("message");

    createStub.restore();
    findOneStub.restore();
  });

  it("should validate task input before saving", async () => {
    // Test logic for input validation
    const req = {
      body: {
        name: "test",
        email: "email",
        password: "123",
        role: "individual",
        agentname: "",
        agentcode: "",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const findOneStub = sinon.stub(User, "findOne").resolves(null);
    const createStub = sinon.stub(User, "create").resolves(null);

    await registerUser(req, res);

    expect(res.status.called).to.be.true;
    expect(res.status.getCall(0).args[0]).to.equal(400);
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.getCall(0).args[0]).to.have.property("message");

    findOneStub.restore();
    createStub.restore();
  });
});
