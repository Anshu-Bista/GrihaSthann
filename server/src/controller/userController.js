import fs from "fs";
import { User } from "../model/userModel.js";
import { profile } from "console";

// Get current logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id; // from authMiddleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }, // hide password
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// Update current logged-in user's profile
export const updateProfile = async (req, res) => {
  try {  console.log("REQ FILE:", req.file);
    console.log("REQ BODY:", req.body);
    const userId = req.user?.id; // from authMiddleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, phone, address, gender } = req.body;

    // Find user
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Prevent duplicate email
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    //Handle Image Paths
    let profileImages = user.profile || [];

    // Handle image
    if (req.file) {
      // delete old image if exists
      if (profileImages.length > 0) {
        const oldPath = path.join(process.cwd(), profileImages[0]);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      // Save relative path to DB
      profileImages = [req.file.path];  // e.g., "uploads/users/1676888888.jpg"
    }

    // Update user
    await user.update({
      name: name ?? user.name,
      email: email ?? user.email,
      phone: phone ?? user.phone,
      address: address ?? user.address,
      gender: gender ?? user.gender,
      profile: profileImages,
    });

    // Return updated user (exclude password)
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({
      message: "Error updating profile",
      error: err.message,
    });
  }
};
