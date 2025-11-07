import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { envVars } from "../config/env";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Configuration (do this once, not inside the function)
cloudinary.config({ 
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file: Express.Multer.File) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
        folder: "CampusLoop",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const bufferStream = Readable.from(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP allowed."));
    }
  },
});

export const fileUploader = {
  upload,
  uploadToCloudinary
}