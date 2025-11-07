"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStatus = exports.ObjectCategory = exports.Availability = exports.ItemCategory = void 0;
var ItemCategory;
(function (ItemCategory) {
    ItemCategory["RENT"] = "RENT";
    ItemCategory["SELL"] = "SELL";
    ItemCategory["SKILL"] = "SKILL";
})(ItemCategory || (exports.ItemCategory = ItemCategory = {}));
var Availability;
(function (Availability) {
    Availability["IN_STOCK"] = "IN_STOCK";
    Availability["RENTED"] = "RENTED";
    Availability["SOLD"] = "SOLD";
})(Availability || (exports.Availability = Availability = {}));
var ObjectCategory;
(function (ObjectCategory) {
    ObjectCategory["TRANSPORTATION"] = "TRANSPORTATION";
    ObjectCategory["ELECTRONICS"] = "ELECTRONICS";
    ObjectCategory["LAPTOP"] = "LAPTOP";
    ObjectCategory["PHONES"] = "PHONES";
    ObjectCategory["TV"] = "TV";
    ObjectCategory["GAMING"] = "GAMING";
    ObjectCategory["CAMERA"] = "CAMERA";
    ObjectCategory["PROJECTOR"] = "PROJECTOR";
    ObjectCategory["LIGHTS"] = "LIGHTS";
    ObjectCategory["CLOTHING"] = "CLOTHING";
    ObjectCategory["SPORTS"] = "SPORTS";
    ObjectCategory["BOOKS"] = "BOOKS";
    ObjectCategory["FURNITURE"] = "FURNITURE";
    ObjectCategory["EVENTS"] = "EVENTS";
    ObjectCategory["WEDDING"] = "WEDDING";
    ObjectCategory["SKILL"] = "SKILL";
    ObjectCategory["OTHERS"] = "OTHERS";
})(ObjectCategory || (exports.ObjectCategory = ObjectCategory = {}));
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["PENDING"] = "PENDING";
    ItemStatus["PUBLISHED"] = "PUBLISHED";
    ItemStatus["CANCEL"] = "CANCEL";
})(ItemStatus || (exports.ItemStatus = ItemStatus = {}));
