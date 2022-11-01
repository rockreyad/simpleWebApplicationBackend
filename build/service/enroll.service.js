"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnroll = exports.findAndUpdate = exports.findOneEnroll = exports.findEnroll = exports.enrollStudent = void 0;
const enroll_1 = __importDefault(require("../models/enroll"));
function enrollStudent(input) {
    return enroll_1.default.create(input);
}
exports.enrollStudent = enrollStudent;
function findEnroll(query, options = { lean: true }) {
    return enroll_1.default.find(query, {}, options);
}
exports.findEnroll = findEnroll;
function findOneEnroll(query, options = { lean: true }) {
    return enroll_1.default.findOne(query, {}, options);
}
exports.findOneEnroll = findOneEnroll;
function findAndUpdate(query, update, options) {
    return enroll_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteEnroll(query) {
    return enroll_1.default.deleteOne(query);
}
exports.deleteEnroll = deleteEnroll;
//# sourceMappingURL=enroll.service.js.map