"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.findAndUpdate = exports.findOneStudent = exports.findStudent = exports.createStudent = void 0;
const student_1 = __importDefault(require("../models/student"));
function createStudent(input) {
    return student_1.default.create(input);
}
exports.createStudent = createStudent;
function findStudent(query, options = { lean: true }) {
    return student_1.default.find(query, {}, options);
}
exports.findStudent = findStudent;
function findOneStudent(query, options = { lean: true }) {
    return student_1.default.findOne(query, {}, options);
}
exports.findOneStudent = findOneStudent;
function findAndUpdate(query, update, options) {
    return student_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteStudent(query) {
    return student_1.default.deleteOne(query);
}
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=student.service.js.map