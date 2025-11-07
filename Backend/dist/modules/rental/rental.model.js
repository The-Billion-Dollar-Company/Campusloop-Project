"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const mongoose_1 = require("mongoose");
const rental_interface_1 = require("../rental/rental.interface");
const rentalSchema = new mongoose_1.Schema({
    renterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    depositAmount: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(rental_interface_1.RentalStatus),
        default: rental_interface_1.RentalStatus.REQUESTED,
    },
    notes: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Rental = (0, mongoose_1.model)("Rental", rentalSchema);
