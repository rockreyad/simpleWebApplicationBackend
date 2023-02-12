"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.findAndUpdate = exports.findOneUser = exports.findUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
function createUser(input) {
    return user_1.default.create(input);
}
exports.createUser = createUser;
function findUser(query, options = { lean: true }) {
    return user_1.default.find(query, {}, options);
}
exports.findUser = findUser;
function findOneUser(query, options = { lean: true }) {
    return user_1.default.findOne(query, {}, options);
}
exports.findOneUser = findOneUser;
function findAndUpdate(query, update, options) {
    return user_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteStudent(query) {
    return user_1.default.deleteOne(query);
}
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=user.service.js.map