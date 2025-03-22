const chai = require("chai"); // Assertion library used for writing test cases
const sinon = require("sinon"); // Library used for mocking/stubbing functions
const mongoose = require("mongoose"); // To generate mock ObejctId value
// Import User
const User = require("../models/User");
// Import function
const { generateToken } = require("../controllers/authController");
const { expect } = chai;

describe("Auth Controller - Create User(Signup)", () => {
  // TODO: write test code later
});
