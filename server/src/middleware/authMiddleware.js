import jwt from "jsonwebtoken";

const SECRET_KEY = "secret-key"; // must match generateToken

export const authMiddleware = (req, res, next) => {
  try {console.log("AUTH HEADER:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY); // use the hardcoded key

    req.user = decoded; // attach user info to request
    next();

  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
