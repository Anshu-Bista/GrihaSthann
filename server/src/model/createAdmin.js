import bcrypt from "bcrypt";
import { User } from "./userModel.js";

export const createAdminIfNotExists = async () => {
  const adminEmail = "admin@gmail.com";

  const admin = await User.findOne({ where: { email: adminEmail } });
  if (admin) return;

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Admin",
    email: adminEmail,
    phone: null,
    address: "System",
    gender: "other",
    password: hashedPassword,
    role: "admin",
  });

  console.log(" Admin created");
};
