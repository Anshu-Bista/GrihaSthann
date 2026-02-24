import { jest } from "@jest/globals";

/* ===============================
   MOCK MODELS
================================ */

jest.unstable_mockModule("../src/model/requestModel.js", () => ({
  Request: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.unstable_mockModule("../src/model/propertyModel.js", () => ({
  Property: {
    findByPk: jest.fn(),
  },
}));

/* ===============================
   IMPORTS
================================ */

const { Request } = await import("../src/model/requestModel.js");
const { Property } = await import("../src/model/propertyModel.js");

const requestController = await import(
  "../src/controller/requestController.js"
);

/* ===============================
   HELPERS
================================ */

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

/* ===============================
   TESTS
================================ */

describe("Request Controller Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ===============================
     CREATE REQUEST
  ================================= */

  it("should create request", async () => {

    const req = {
      user: { id: 1 },
      body: {
        propertyId: 1,
        visitDate: "2026-01-01"
      }
    };

    const res = mockResponse();

    Property.findByPk.mockResolvedValue({
      propertyId: 1
    });

    Request.findOne.mockResolvedValue(null);

    Request.create.mockResolvedValue({
      id: 1,
      userId: 1,
      propertyId: 1
    });

    await requestController.createRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  /* ===============================
     PROPERTY NOT FOUND
  ================================= */

  it("should return 404 if property not found", async () => {

    const req = {
      user: { id: 1 },
      body: {
        propertyId: 999
      }
    };

    const res = mockResponse();

    Property.findByPk.mockResolvedValue(null);

    await requestController.createRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  /* ===============================
     DUPLICATE REQUEST PREVENTION
  ================================= */

  it("should prevent duplicate request", async () => {

    const req = {
      user: { id: 1 },
      body: {
        propertyId: 1
      }
    };

    const res = mockResponse();

    Property.findByPk.mockResolvedValue({
      propertyId: 1
    });

    Request.findOne.mockResolvedValue({
      id: 1
    });

    await requestController.createRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  /* ===============================
     GET USER REQUESTS
  ================================= */

  it("should get user requests", async () => {

    const req = {
      user: { id: 1 }
    };

    const res = mockResponse();

    Request.findAll.mockResolvedValue([
      {
        id: 1,
        propertyId: 1,
        Property: {
          title: "House"
        }
      }
    ]);

    await requestController.getUserRequests(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});