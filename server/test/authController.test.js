import { jest } from "@jest/globals";

/* ===============================
   MOCKS (BEFORE IMPORTS)
================================ */

jest.unstable_mockModule("../src/model/userModel.js", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.unstable_mockModule("../src/security/jwt-utils.js", () => ({
  generateToken: jest.fn(),
}));

/* ===============================
   IMPORTS (AFTER MOCKS)
================================ */

const { User } = await import("../src/model/userModel.js");

const bcryptModule = await import("bcrypt");
const bcrypt = bcryptModule.default;

const { generateToken } = await import("../src/security/jwt-utils.js");

const authController = await import("../src/controller/authController.js");

/* ===============================
   HELPER
================================ */

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

/* ===============================
   TESTS
================================ */

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register user", async () => {
    const req = {
      body: {
        name: "Menuka",
        email: "menuka@gmail.com",
        password: "Menuka@123",
        confirmPassword: "Menuka@123",
      },
    };

    const res = mockResponse();

    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");

    User.create.mockResolvedValue({
      id: 1,
      email: "menuka@gmail.com",
      role: "user",
      toJSON() {
        return this;
      },
    });

    generateToken.mockReturnValue("token");

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should login user", async () => {
    const req = {
      body: {
        email: "menuka@gmail.com",
        password: "Menuka@123",
      },
    };

    const res = mockResponse();

    User.findOne.mockResolvedValue({
      id: 1,
      email: "menuka@gmail.com",
      password: "hashedPassword",
      role: "user",
      toJSON() {
        return this;
      },
    });

    bcrypt.compare.mockResolvedValue(true);
    generateToken.mockReturnValue("token");

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});