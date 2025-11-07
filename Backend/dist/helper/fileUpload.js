"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const env_1 = require("../config/env");
// Use memory storage instead of disk storage
const storage = multer_1.default.memoryStorage();
// Configuration (do this once, not inside the function)
cloudinary_1.v2.config({
    cloud_name: env_1.envVars.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.envVars.CLOUDINARY_API_KEY,
    api_secret: env_1.envVars.CLOUDINARY_API_SECRET,
});
function uploadToCloudinary(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
                folder: "CampusLoop",
                resource_type: "auto",
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
            // Convert buffer to stream and pipe to Cloudinary
            const bufferStream = stream_1.Readable.from(file.buffer);
            bufferStream.pipe(uploadStream);
        });
    });
}
;
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP allowed."));
        }
    },
});
exports.fileUploader = {
    upload,
    uploadToCloudinary
};
