import { User } from "../model/userModel.js";

export const save = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send({ message: "Required fields are missing" });
      }
  
      const user = await User.create({
        name,
        email,
        password,
      });
  
      res.status(201).send({
        data: user,
        message: "User saved successfully",
      });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  };