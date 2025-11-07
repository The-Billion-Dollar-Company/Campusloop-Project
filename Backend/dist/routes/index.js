"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const item_route_1 = require("../modules/item/item.route");
const rental_route_1 = require("../modules/rental/rental.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    }, {
        path: '/auth',
        route: auth_route_1.AuthRotues
    }, {
        path: '/item',
        route: item_route_1.ItemRoutes
    }, {
        path: '/rent',
        route: rental_route_1.RentRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
