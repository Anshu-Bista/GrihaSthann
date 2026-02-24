import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();

/* Mock Request Model */
const RequestMock = dbMock.define("Request", {
  id: 1,
  userId: 1,
  propertyId: 1,
  status: "pending",
  visitDate: new Date()
});

describe("Request Model", () => {

  it("should create request", async () => {

    const request = await RequestMock.create({
      userId: 1,
      propertyId: 1,
      status: "pending"
    });

    expect(request.get("userId")).toBe(1);
    expect(request.get("propertyId")).toBe(1);
    expect(request.get("status")).toBe("pending");

  });

  it("should default status to pending", async () => {

    const request = await RequestMock.create({
      userId: 1,
      propertyId: 1
    });

    expect(request.get("status")).toBe("pending");

  });

});