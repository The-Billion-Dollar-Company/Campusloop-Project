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
exports.AdminServices = exports.allUsers = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const item_model_1 = require("../item/item.model");
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const updateUserStatus = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    user.isStatus = status;
    user.isVerified = true;
    yield user.save();
    return user;
});
const allItems = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, sellingCategory, availability, minPrice, maxPrice, status, sortBy = "createdAt", sortOrder = "desc", page = "1", limit = "10", } = query;
    const filters = {};
    if (search) {
        filters.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (category) {
        filters.objectCategory = category.toUpperCase();
    }
    if (sellingCategory) {
        filters.sellingCategory = sellingCategory.toUpperCase();
    }
    if (status) {
        filters.status = status.toUpperCase();
    }
    if (availability) {
        filters.availability = availability.toUpperCase();
    }
    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice)
            filters.price.$gte = Number(minPrice);
        if (maxPrice)
            filters.price.$lte = Number(maxPrice);
    }
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    const [items, totalItems] = yield Promise.all([
        item_model_1.Item.find(filters)
            .populate("ownerId", "name email universityId picture")
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum),
        item_model_1.Item.countDocuments(filters),
    ]);
    return {
        data: items,
        meta: {
            total: totalItems,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalItems / limitNum),
        },
    };
});
const allUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, role, status, sortBy = "createdAt", sortOrder = "desc", page = "1", limit = "10", } = query;
    const filters = {};
    // Search by name or email
    if (search) {
        filters.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    // Filter by role
    if (role) {
        filters.activeRole = role.toUpperCase();
    }
    // Filter by status
    if (status) {
        filters.isStatus = status.toUpperCase();
    }
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    // Query DB
    const [users, totalUsers] = yield Promise.all([
        user_model_1.User.find(filters)
            .populate("items", "title price sellingCategory availability picture")
            .populate("rentals", "itemId status rentDate returnDate")
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum),
        user_model_1.User.countDocuments(filters),
    ]);
    return {
        data: users,
        meta: {
            total: totalUsers,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalUsers / limitNum),
        },
    };
});
exports.allUsers = allUsers;
exports.AdminServices = {
    updateUserStatus,
    allItems,
    allUsers: exports.allUsers
};
