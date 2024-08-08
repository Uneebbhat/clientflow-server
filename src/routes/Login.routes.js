import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const router = Router();

router.post("/v1/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res
      .status(200)
      .json({ success: true, data: existingUser, token: token });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
