"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    presentAddress: { type: String },
    activeRole: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.BUYER,
    },
    isStatus: {
        type: String,
        enum: Object.values(user_interface_1.Status),
        default: user_interface_1.Status.PENDING,
    },
    picture: { type: String },
    universityId: { type: String },
    isVerified: { type: Boolean, default: false },
    transactions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Transaction",
        }],
    wallet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Wallet"
    },
    items: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Item"
        }],
    rentals: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Rentals"
        }],
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)("User", userSchema);
