"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.findAndUpdate = exports.findOneCourse = exports.findCourse = exports.createCourse = void 0;
const course_1 = __importDefault(require("../models/course"));
function createCourse(input) {
    return course_1.default.create(input);
}
exports.createCourse = createCourse;
function findCourse(query, options = { lean: true }) {
    return course_1.default.find(query, {}, options);
}
exports.findCourse = findCourse;
function findOneCourse(query, options = { lean: true }) {
    return course_1.default.findOne(query, {}, options);
}
exports.findOneCourse = findOneCourse;
function findAndUpdate(query, update, options) {
    return course_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteCourse(query) {
    return course_1.default.deleteOne(query);
}
exports.deleteCourse = deleteCourse;
//# sourceMappingURL=course.service.js.map