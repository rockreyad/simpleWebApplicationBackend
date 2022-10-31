"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.findAndUpdate = exports.findOneTeacher = exports.findTeacher = exports.createTeacher = void 0;
const teacher_1 = __importDefault(require("../models/teacher"));
function createTeacher(input) {
    return teacher_1.default.create(input);
}
exports.createTeacher = createTeacher;
function findTeacher(query, options = { lean: true }) {
    return teacher_1.default.find(query, {}, options);
}
exports.findTeacher = findTeacher;
function findOneTeacher(query, options = { lean: true }) {
    return teacher_1.default.findOne(query, {}, options);
}
exports.findOneTeacher = findOneTeacher;
function findAndUpdate(query, update, options) {
    return teacher_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteTeacher(query) {
    return teacher_1.default.deleteOne(query);
}
exports.deleteTeacher = deleteTeacher;
//# sourceMappingURL=teacher.service.js.map