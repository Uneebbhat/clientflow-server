import { Router } from "express";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";
// import { body, validationResult } from "express-validator";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "/uploads" });

router.post("/v1/signup", upload.single("profilePic"), async (req, res) => {
  const { name, email, password } = req.body;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   console.log(errors.array()); // Log the validation errors
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let profilePicUrl = null;
    if (req.file) {
      const result = await cloudinaryUpload(req.file.path, {
        folder: "clientflow/user",
      });
      profilePicUrl = result.secure_url;
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPass,
      profilePic: profilePicUrl,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({ success: true, data: newUser, token: token });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
