import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
  id: 1,
  name: "Menuka",
  email: "menuka@gmail.com",
  phone: 9821078654,
  address: "Dillibazar",
  gender: "female",
  password: "Menuka@123",
  role: "user",
});

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await UserMock.create({
      name: "Menuka",
      email: "menuka@gmail.com",
      phone: 9821078654,
      address: "Dillibazar",
      gender: "female",
      password: "Menuka@123",
      role: "user",
    });

    expect(user.get("name")).toBe("Menuka");
    expect(user.get("email")).toBe("menuka@gmail.com");
    expect(user.get("phone")).toBe(9821078654);
    expect(user.get("address")).toBe("Dillibazar");
    expect(user.get("gender")).toBe("female");
    expect(user.get("password")).toBe("Menuka@123");
    expect(user.get("role")).toBe("user");
  });
});