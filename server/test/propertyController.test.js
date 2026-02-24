import { jest } from "@jest/globals";

/* ===============================
   MOCKS
================================ */

jest.unstable_mockModule("../src/model/propertyModel.js", () => ({
  Property: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    increment: jest.fn(),
  },
}));

jest.unstable_mockModule("../src/model/propertyViewModel.js", () => ({
  PropertyView: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.unstable_mockModule("zod", () => ({
  ZodError: class ZodError extends Error {
    constructor() {
      super("ZodError");
      this.errors = [];
      this.name = "ZodError";
    }
  }
}));

/* ===============================
   IMPORTS
================================ */

const { Property } = await import("../src/model/propertyModel.js");
const { PropertyView } = await import("../src/model/propertyViewModel.js");

const propertyController = await import("../src/controller/propertyController.js");

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
   TEST CASES
================================ */

describe("Property Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ---------- CREATE PROPERTY ---------- */

  it("should create property", async () => {

    const req = {
      body: {
        title: "Test House",
        description: "Nice house",
        price: "10000",
        area: "1200",
        yearBuilt: "2020",
        level: "2",
        bed: "2",
        bath: "1",
        kitchen: "1",
        amenities: ["wifi"]
      },
      files: [
        { path: "uploads/test1.jpg" }
      ]
    };

    const res = mockResponse();

    Property.create.mockResolvedValue({
      id: 1,
      title: "Test House"
    });

    await propertyController.createProperty(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  /* ---------- GET PROPERTIES ---------- */

  it("should get properties list", async () => {

    const req = {};
    const res = mockResponse();

    Property.findAll.mockResolvedValue([
      { id: 1, title: "House 1" }
    ]);

    await propertyController.getProperties(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* ---------- GET PROPERTY BY ID ---------- */

  it("should get property by id", async () => {

    const req = {
      params: { id: 1 },
      user: { id: 10 }
    };

    const res = mockResponse();

    Property.findOne
      .mockResolvedValueOnce({
        propertyId: 1
      })
      .mockResolvedValueOnce({
        propertyId: 1
      });

    PropertyView.findOne.mockResolvedValue(null);

    PropertyView.create.mockResolvedValue({});

    Property.increment.mockResolvedValue([1]);

    await propertyController.getPropertyById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  /* ---------- DELETE PROPERTY ---------- */

  it("should delete property", async () => {

    const req = {
      params: { id: 1 }
    };

    const res = mockResponse();

    Property.findOne.mockResolvedValue({
      destroy: jest.fn()
    });

    await propertyController.deleteProperty(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Property deleted successfully"
      })
    );
  });

});