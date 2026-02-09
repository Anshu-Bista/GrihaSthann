import jwt from "jsonwebtoken";

const SECRET_KEY = "secret-key"; // same key used in authMiddleware

export const generateToken = (payLoad) => {
  return jwt.sign(payLoad, SECRET_KEY, { expiresIn: "1h" });
};
