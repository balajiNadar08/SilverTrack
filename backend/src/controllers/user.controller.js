import User from "../models/user.model";

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
