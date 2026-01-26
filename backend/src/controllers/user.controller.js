import User from "../models/user.model.js";
import MovieEntry from "../models/movieEntry.model.js";

//* GET: /user/me
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("Error fetching profile:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};


//* PUT: /user/me
export const editMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, avatar, theme } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (theme !== undefined) updateData.theme = theme;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser
    });

  } catch (error) {
    console.error("Failed to edit profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to edit user profile",
    });
  }
};


//* DELETE: /user/me
export const deleteMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    await MovieEntry.deleteMany({ userId });
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete profile",
    });
  }
};
