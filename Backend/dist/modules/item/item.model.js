"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = require("mongoose");
const Item_interface_1 = require("./Item.interface");
const itemSchema = new mongoose_1.Schema({
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    deposit: {
        type: Number,
        min: 0,
        default: 0,
    },
    condition: {
        type: String,
        enum: ["NEW", "USED"],
    },
    sellingCategory: {
        type: String,
        enum: Object.values(Item_interface_1.ItemCategory),
        required: true,
    },
    availability: {
        type: String,
        enum: Object.values(Item_interface_1.Availability),
        default: Item_interface_1.Availability.IN_STOCK,
    },
    status: {
        type: String,
        enum: Object.values(Item_interface_1.ItemStatus),
        default: Item_interface_1.ItemStatus.PENDING,
    },
    objectCategory: {
        type: String,
        enum: Object.values(Item_interface_1.ObjectCategory),
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    picture: {
        type: String,
    },
    pictures: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Item = (0, mongoose_1.model)("Item", itemSchema);
