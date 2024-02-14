import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.json({ error: "Existing user" });
    }

    const user = new User(userData);
    await user.save();
    if (user) {
      return res.status(201).json({
        user: {
          email: user.email,
          userName: user.userName,
          _id: user._id,
        },
      });
    }
  } catch (error) {
    console.log("Error While registering", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPass(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.fullName,
        email: user.email,
      });
    } else {
      res.json({ error: "Invalid Email or Password" });
      return;
    }
  } catch (error) {
    console.log("Error While registering", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
