"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUniversityId = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const extractUniversityId = (email) => {
    if (!email.endsWith("@cse.bubt.edu.bd")) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Please Register with BUBT Edu mail");
    }
    const universityId = email.split("@")[0];
    // check if it's all digits (since student IDs are numeric)
    if (!/^\d+$/.test(universityId)) {
        throw new Error("Invalid student ID format in email.");
    }
    return universityId;
};
exports.extractUniversityId = extractUniversityId;
