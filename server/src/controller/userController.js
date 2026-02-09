import { User } from "../model/userModel.js";

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
