import { jest } from "@jest/globals";

/* ===============================
   MOCK MODULES
================================ */

jest.unstable_mockModule("../src/model/userModel.js", () => ({
  User: {
    findByPk: jest.fn(),
    findOne: jest.fn(),
  },
}));

/* ===============================
   IMPORTS AFTER MOCKS
================================ */

const { User } = await import("../src/model/userModel.js");
const profileController = await import("../src/controller/userController.js");

/* ===============================
   HELPER MOCK RESPONSE
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

describe("Profile Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ---------- GET PROFILE ---------- */

  it("should get user profile", async () => {
    const req = {
      user: { id: 1 }
    };

    const res = mockResponse();

    User.findByPk.mockResolvedValue({
      id: 1,
      name: "Menuka",
      email: "test@gmail.com"
    });

    await profileController.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  /* ---------- UNAUTHORIZED ---------- */

  it("should return unauthorized if no user", async () => {
    const req = { user: null };
    const res = mockResponse();

    await profileController.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  /* ---------- UPDATE PROFILE ---------- */

  it("should update profile", async () => {
    const req = {
      user: { id: 1 },
      body: {
        name: "Updated Name",
        email: "new@gmail.com"
      },
      file: {
        path: "uploads/users/test.jpg"
      }
    };

    const res = mockResponse();

    User.findByPk
      .mockResolvedValueOnce({
        id: 1,
        email: "old@gmail.com",
        profile: [],
        update: jest.fn()
      })
      .mockResolvedValueOnce({
        id: 1,
        name: "Updated Name"
      });

    User.findOne.mockResolvedValue(null);

    await profileController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});