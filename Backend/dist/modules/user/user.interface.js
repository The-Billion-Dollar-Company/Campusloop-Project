"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["SELLER"] = "SELLER";
    Role["BUYER"] = "BUYER";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["ACTIVE"] = "ACTIVE";
    Status["SUSPEND"] = "SUSPEND";
})(Status || (exports.Status = Status = {}));
