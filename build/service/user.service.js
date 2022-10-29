"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findAndUpdate = exports.findUser = exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users"));
function createUser(input) {
    return users_1.default.create(input);
}
exports.createUser = createUser;
function findUser(query, options = { lean: true }) {
    return users_1.default.find(query, {}, options);
}
exports.findUser = findUser;
function findAndUpdate(query, update, options) {
    return users_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteUser(query) {
    return users_1.default.deleteOne(query);
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map