"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.findAndUpdate = exports.findOneDepartment = exports.findDepartment = exports.createDepartment = void 0;
const department_1 = __importDefault(require("../models/department"));
function createDepartment(input) {
    return department_1.default.create(input);
}
exports.createDepartment = createDepartment;
function findDepartment(query, options = { lean: true }) {
    return department_1.default.find(query, {}, options);
}
exports.findDepartment = findDepartment;
function findOneDepartment(query, options = { lean: true }) {
    return department_1.default.findOne(query, {}, options);
}
exports.findOneDepartment = findOneDepartment;
function findAndUpdate(query, update, options) {
    return department_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteDepartment(query) {
    return department_1.default.deleteOne(query);
}
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=department.service.js.map