import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryUpload = async (filePath, options = {}) => {
  try {
    return cloudinary.uploader.upload(filePath, options);
  } catch (e) {
    console.log(e.message);
  }
};

export default cloudinaryUpload;
