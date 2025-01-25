import bcrypt from "bcrypt";
import UserModel from "../model/user.model.js";
import generateTokenAndSetCookie from "../lib/generateTokenAndSetCookie .js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required" });
    }
    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must contain more than 3 characters",
      });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json({
      username: newUser.username,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error in register controller", error);
    return res.status(500).json({ message: "Error Registering User" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    generateTokenAndSetCookie(existingUser._id, res);

    return res.status(200).json({ username, message: "User LoggedIn" });
  } catch (error) {
    console.log("error in login controller", error);
    return res.status(500).json({ message: "Login Failed" });
  }
};
