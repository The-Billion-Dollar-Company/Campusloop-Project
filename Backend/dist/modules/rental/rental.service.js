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
exports.RentalServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const rental_interface_1 = require("./rental.interface");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const rental_model_1 = require("./rental.model");
const item_model_1 = require("../item/item.model");
const Item_interface_1 = require("../item/Item.interface");
const mongoose_1 = __importDefault(require("mongoose"));
const createRental = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.ownerId ||
        !payload.renterId ||
        !payload.itemId ||
        !payload.startDate ||
        !payload.endDate ||
        !payload.depositAmount ||
        !payload.totalAmount) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Missing required fields for item creation");
    }
    const renterUser = yield user_model_1.User.findById(userId); // userId = logged user through jwt
    if (!renterUser) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_GATEWAY, "User not found");
    }
    if (payload.ownerId === payload.renterId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_GATEWAY, "User cannot rent his own item");
    }
    if (payload.renterId.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_GATEWAY, "You are not allowed to rent from this account");
    }
    const isItem = yield item_model_1.Item.findById(payload.itemId);
    if (!isItem) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Item is not found");
    }
    const rent = yield rental_model_1.Rental.create(payload);
    renterUser.rentals = renterUser.rentals || [];
    renterUser.rentals.push(rent._id);
    yield renterUser.save();
    return rent;
});
const allRentals = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_GATEWAY, "User not found");
    }
    const rentals = yield rental_model_1.Rental.find({ renterId: userId })
        .populate("itemId", "title price picture")
        .populate("ownerId", "name email picture")
        .lean();
    return rentals;
});
const rentalInfoById = (rentalId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield rental_model_1.Rental.findById(rentalId)
        .populate("itemId", "title price picture")
        .populate("ownerId", "name email picture")
        .populate("renterId", "name email picture")
        .lean();
    if (!rental)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Rental not found");
    if (rental.renterId._id.toString() !== userId)
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized to view this rental");
    return rental;
});
const updateRentalStatus = (rentalId, userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession(); // transaction
    session.startTransaction();
    try {
        const rental = yield rental_model_1.Rental.findById(rentalId).session(session);
        if (!rental)
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Rental not found");
        const item = yield item_model_1.Item.findById(rental.itemId).session(session);
        if (!item) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Item not found");
        }
        const isOwner = rental.ownerId.toString() === userId;
        const isRenter = rental.renterId.toString() === userId;
        if (!isOwner && !isRenter)
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not allowed to update this rental");
        // --- Owner actions ---
        if (isOwner) {
            if (rental.status === rental_interface_1.RentalStatus.REQUESTED && status === rental_interface_1.RentalStatus.ONGOING) {
                rental.status = rental_interface_1.RentalStatus.ONGOING;
                item.availability = Item_interface_1.Availability.RENTED;
            }
            else if (rental.status === rental_interface_1.RentalStatus.REQUESTED && status === rental_interface_1.RentalStatus.REJECTED) {
                rental.status = rental_interface_1.RentalStatus.REJECTED;
            }
            else {
                throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Owner can only update REQUESTED rentals");
            }
        }
        // --- Renter actions ---
        if (isRenter) {
            if (rental.status === rental_interface_1.RentalStatus.REQUESTED &&
                status === rental_interface_1.RentalStatus.CANCELLED) {
                rental.status = rental_interface_1.RentalStatus.CANCELLED;
                item.availability = Item_interface_1.Availability.IN_STOCK;
            }
            else if (rental.status === rental_interface_1.RentalStatus.ONGOING &&
                status === rental_interface_1.RentalStatus.RETURNED) {
                rental.status = rental_interface_1.RentalStatus.RETURNED;
                rental.returnDate = new Date();
                item.availability = Item_interface_1.Availability.IN_STOCK;
            }
            else {
                throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid renter status update");
            }
        }
        yield item.save({ session });
        yield rental.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return rental;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const deleteRental = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    const rental = yield rental_model_1.Rental.findById(rentalId);
    if (!rental)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Rental not found");
    const item = yield item_model_1.Item.findById(rental.itemId);
    if (!item) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Item not found");
    }
    item.availability = Item_interface_1.Availability.IN_STOCK;
    yield rental_model_1.Rental.findByIdAndDelete(rentalId);
    yield item.save();
    return rental;
});
exports.RentalServices = {
    createRental,
    allRentals,
    rentalInfoById,
    updateRentalStatus,
    deleteRental,
};
