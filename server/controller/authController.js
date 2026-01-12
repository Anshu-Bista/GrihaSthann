import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../security/jwt-utils.js";


/* ------------ REGISTER ------------ */
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      gender,
      password,
      confirmPassword
    } = req.body;

    /* ------------ Validation ------------ */

    if (!name || !email || !password) {
      return res.status(400).send({ message: "Required fields are missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    /* -------- Check existing email ------- */

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: "Email already in use" });
    }

    /* ---------- Hash password ------------ */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ----------- Create user ------------- */

    const newUser = await User.create({
      name,
      email,
      phone,
      address,
      gender,
      password: hashedPassword,
      role: "user"
    });

    /* ------------ JWT token -------------- */

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    const { password: pw, ...userData } = newUser.toJSON();

    return res.status(201).send({
      message: "User registered successfully",
      user: userData,
      access_token: token
    });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};




/*------------ LOGIN (Admin & User)---------------------- */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send({
          message: "Email and password are required",
        });
      }
  
    /* -------- Check existing email ------- */
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
    /* -------- Compare password  ------- */
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Password is incorrect" });
      }
  
    /* ------------ JWT token -------------- */
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
  
      const { password: pw, ...userData } = user.toJSON();
  
      res.status(200).send({
        message: "Login successful",
        user: userData,
        role: user.role,
        access_token: token,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  