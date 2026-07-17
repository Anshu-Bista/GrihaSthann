import { jest } from "@jest/globals";

/* ===============================
   MOCK PROPERTY MODEL
================================ */

jest.unstable_mockModule("../src/model/propertyModel.js", () => ({
  Property: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    increment: jest.fn(),
  }
}));

/* ===============================
   IMPORTS
================================ */

const { Property } = await import("../src/model/propertyModel.js");

const propertyController = await import(
  "../src/controller/propertyController.js"
);

/* ===============================
   RESPONSE MOCK
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

describe("Property Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* CREATE PROPERTY */

  it("should create property", async () => {

    const req = {
      body: {
        title: "Test House",
        description: "Nice house",
        propertyType: "house",
        price: "10000",
        area: "1200",
        locationArea: "Dillibazar",
        city: "Kathmandu",
        street: "Main Road",
        zip: "44600",
        furnishingStatus: "furnished",
        yearBuilt: "2020",
        level: "2",
        bed: "2",
        bath: "1",
        kitchen: "1",
        amenities: ["wifi"]
      },
      files: [{ path: "uploads/test1.jpg" }]
    };

    const res = mockResponse();

    Property.create.mockResolvedValue({
      id: 1,
      title: "Test House"
    });

    await propertyController.createProperty(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  /* GET ALL */

  it("should get properties", async () => {

    const res = mockResponse();

    Property.findAll.mockResolvedValue([
      { id: 1, title: "House 1" }
    ]);

    await propertyController.getProperties({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* GET BY ID */

  it("should get property by id", async () => {

    const req = {
      params: { id: 1 }
    };

    const res = mockResponse();

    Property.findOne
      .mockResolvedValueOnce({ propertyId: 1 })
      .mockResolvedValueOnce({ propertyId: 1 });

    Property.increment.mockResolvedValue([1]);

    await propertyController.getPropertyById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  /* DELETE */

  it("should delete property", async () => {

    const req = {
      params: { id: 1 }
    };

    const res = mockResponse();

    Property.findOne.mockResolvedValue({
      destroy: jest.fn().mockResolvedValue(true)
    });

    await propertyController.deleteProperty(req, res);

    expect(res.json).toHaveBeenCalled();
  });

});