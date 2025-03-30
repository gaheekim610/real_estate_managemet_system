const chai = require("chai"); // Assertion library used for writing test cases
const sinon = require("sinon"); // Library used for mocking/stubbing functions
const mongoose = require("mongoose"); // To generate mock ObejctId value
const {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { expect } = chai;
// Import User
const User = require("../models/User");
const Property = require("../models/Property");
// Import function

// Create
describe("POST /api/property - Create Property", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should allow agent to create property", async () => {
    const agentUserId = new mongoose.Types.ObjectId();
    const testUser = {
      _id: agentUserId,
      id: agentUserId.toString(),
      role: "agent",
    };

    const req = {
      user: testUser,
      body: {
        title: "Selling a Home",
        description: "Feel free to contact us",
        image: "",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(User, "findById").resolves(testUser);
    sinon.stub(Property, "create").resolves({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      user: testUser._id,
    });

    await createProperty(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.getCall(0).args[0];
    expect(result).to.include.keys("title", "description", "image", "user");
  });

  it("should denied normal user to create property", async () => {
    const individualId = new mongoose.Types.ObjectId();
    const testUser = {
      _id: individualId,
      id: individualId.toString(),
      role: "individual",
    };

    const req = {
      user: testUser,
      body: {
        title: "Fake Property",
        description: "Should not be created",
        image: "http://example.com/fake.jpg",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(User, "findById").resolves(testUser);

    await createProperty(req, res);
    console.log("Individual user create result:", res.json.getCall(0).args[0]);

    expect(res.status.calledWith(403)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "Only agents can create property posting",
      })
    ).to.be.true;
  });
});

// Read
describe("Read Property", async () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should allow individual user to see all properties", async () => {
    const req = {
      user: {
        _id: new mongoose.Types.ObjectId(),
        role: "individual",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const testProperties = [
      { title: "House A", user: new mongoose.Types.ObjectId() },
      { title: "House B", user: new mongoose.Types.ObjectId() },
    ];

    sinon.stub(Property, "find").resolves(testProperties);

    await getProperties(req, res);

    console.log("all properties", res.json.getCall(0).args[0]);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(testProperties)).to.be.true;
  });
  it("should allow agent to read only their own properties", async () => {
    const agentUserId = new mongoose.Types.ObjectId();
    const req = {
      user: {
        _id: agentUserId,
        role: "agent",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const testProperties = [{ title: "Agent's Property", user: agentUserId }];

    sinon
      .stub(Property, "find")
      .withArgs({ user: agentUserId })
      .resolves(testProperties);

    await getProperties(req, res);
    console.log(
      "properties should be uploaded by agent only",
      res.json.getCall(0).args[0]
    );

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(testProperties)).to.be.true;
  });
});

// Update
describe("Update Property", async () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should allow agent to update their property post", async () => {
    const agentUserId = new mongoose.Types.ObjectId();
    const testUser = {
      _id: agentUserId,
      id: agentUserId.toString(),
      role: "agent",
    };

    const propertyId = new mongoose.Types.ObjectId();
    const existingProperty = {
      _id: propertyId,
      user: agentUserId,
      title: "existing title",
      description: "existing description",
      image: "existing.jpg",
      save: sinon.stub().resolvesThis(), // Pretending to submit
    };

    const req = {
      user: testUser,
      params: { id: propertyId.toString() },
      body: {
        title: "Updated Title",
        description: "Updated description",
        image: "updated.jpg",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Property, "findById").resolves(existingProperty);

    await updateProperty(req, res);

    const result = res.json.getCall(0).args[0];

    expect(res.status.calledWith(200)).to.be.true;
    expect(result.title).to.equal("Updated Title");
  });

  it("should be denied to update if user's role is individual", async () => {
    const userId = new mongoose.Types.ObjectId();
    const testUser = {
      _id: userId,
      id: userId.toString(),
      role: "individual",
    };

    const propertyId = new mongoose.Types.ObjectId();
    const existingProperty = {
      _id: propertyId,
      user: userId,
      title: "Title",
      description: "Description",
      image: "original.jpg",
    };

    const req = {
      user: testUser,
      params: { id: propertyId.toString() },
      body: {
        title: "Updated by individual",
        description: "Should not be allowed",
        image: "",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Property, "findById").resolves(existingProperty);

    await updateProperty(req, res);

    console.log("Role-based rejection result:", res.json.getCall(0).args[0]);

    expect(res.status.calledWith(403)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "Not authorised",
      })
    ).to.be.true;
  });
});

// Delete

describe("Delete Property", async () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should allow agent to delete their own property", async () => {
    const agentUserId = new mongoose.Types.ObjectId();

    const testUser = {
      _id: agentUserId,
      id: agentUserId.toString(),
      role: "agent",
    };

    const propertyId = new mongoose.Types.ObjectId();

    const testProperty = {
      _id: propertyId,
      user: agentUserId, // ✅ 같은 ID 사용
      title: "Test Property",
      deleteOne: sinon.stub().resolvesThis(),
    };

    const req = {
      user: testUser,
      params: {
        id: propertyId.toString(),
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Property, "findById").resolves(testProperty);

    await deleteProperty(req, res);

    const result = res.json.getCall(0).args[0];
    console.log("DELETE result: ", result);

    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWithMatch({ message: "Property deleted successfully" })
    ).to.be.true;
  });

  it("should reject delete if user is not agent", async () => {
    const req = {
      user: {
        _id: new mongoose.Types.ObjectId(),
        role: "individual",
      },
      params: {
        id: new mongoose.Types.ObjectId().toString(),
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await deleteProperty(req, res);

    expect(res.status.calledWith(403)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Not authorised" })).to.be.true;
  });
});
