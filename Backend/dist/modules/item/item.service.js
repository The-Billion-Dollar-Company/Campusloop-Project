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
exports.ItemServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const item_model_1 = require("./item.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const createItem = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Basic validation
    if (!payload.ownerId ||
        !payload.title ||
        !payload.price ||
        !payload.sellingCategory ||
        !payload.availability ||
        !payload.objectCategory) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Missing required fields for item creation");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User not found");
    }
    if (payload.ownerId.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not allowed to post from this account");
    }
    const item = yield item_model_1.Item.create(payload);
    user.items = user.items || []; // ensure array exists
    (_a = user === null || user === void 0 ? void 0 : user.items) === null || _a === void 0 ? void 0 : _a.push(item._id);
    yield user.save();
    yield item.populate("ownerId", "name");
    return item;
});
const allItem = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, // listed category item
    sellingCategory, // SELL RENT SKILL
    availability, minPrice, maxPrice, sortBy = "createdAt", sortOrder = "desc", page = "1", limit = "10", } = query;
    const filters = {};
    if (search) {
        filters.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    if (category) {
        filters.objectCategory = category;
    }
    if (sellingCategory) {
        filters.sellingCategory = sellingCategory;
    }
    if (availability) {
        filters.availability = availability;
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
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const [items, totalItems] = yield Promise.all([
        item_model_1.Item.find(filters).populate("ownerId", "name email universityId picture").sort(sortOptions).skip(skip).limit(limitNum), item_model_1.Item.countDocuments(filters)
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
const itemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield item_model_1.Item.findById(id).populate("ownerId", "name email universityId picture");
    if (!res) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Item not found");
    }
    return res;
});
const updateItem = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_model_1.Item.findById(id);
    if (!item) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Item not found");
    }
    if (item.ownerId.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not allowed to delete this item");
    }
    const updateItem = yield item_model_1.Item.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    // new = true, noton document return krbe(bydefault update krle prev document return kore)
    // runValidator = update korar time e Item Schema check kore update krbe.
    return updateItem;
});
const deleteItem = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_model_1.Item.findById(id);
    if (!item) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Item not found");
    }
    if (item.ownerId.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not allowed to delete this item");
    }
    yield item.deleteOne();
    yield user_model_1.User.findByIdAndUpdate(userId, { $pull: { items: id } });
    return item;
});
exports.ItemServices = {
    createItem,
    allItem,
    itemById,
    updateItem,
    deleteItem,
};
