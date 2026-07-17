import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();

/* Mock Property Model */
const PropertyMock = dbMock.define("Property", {
  propertyId: 1,
  title: "House for Rent",
  description: "Nice house",
  propertyType: "house",
  price: 10000,
  area: 1200,
  locationArea: "Dillibazar",
  city: "Kathmandu",
  street: "Main Street",
  zip: 44600,
  images: ["image1.jpg"],
  amenities: { wifi: true },
  leaseType: "monthly",
  tenantType: "family",
  furnishingStatus: "furnished",
  yearBuilt: 2020,
  level: 2,
  bed: 2,
  bath: 1,
  kitchen: 1,
  status: "active",
  viewCount: 0,
  saveCount: 0
});

describe("Property Model", () => {

  it("should create property", async () => {
    const property = await PropertyMock.create({
      title: "House for Rent",
      description: "Nice house",
      propertyType: "house",
      price: 10000,
      area: 1200,
      locationArea: "Dillibazar",
      city: "Kathmandu",
      street: "Main Street",
      zip: 44600,
      images: ["image1.jpg"],
      furnishingStatus: "furnished",
      yearBuilt: 2020,
      level: 2,
      bed: 2,
      bath: 1,
      kitchen: 1
    });

    expect(property.get("title")).toBe("House for Rent");
    expect(property.get("city")).toBe("Kathmandu");
    expect(property.get("price")).toBe(10000);
    expect(property.get("status")).toBe("active");
  });

  it("should increment view count", async () => {
    const property = await PropertyMock.create({
      viewCount: 0
    });

    property.viewCount += 1;

    expect(property.viewCount).toBe(1);
  });

});