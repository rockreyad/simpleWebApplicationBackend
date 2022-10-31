"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneInstructor = exports.setInstructor = void 0;
const courseInstructor_1 = __importDefault(require("../models/courseInstructor"));
function setInstructor(input) {
    return courseInstructor_1.default.create(input);
}
exports.setInstructor = setInstructor;
function findOneInstructor(query, options = { lean: true }) {
    return courseInstructor_1.default.findOne(query, {}, options);
}
exports.findOneInstructor = findOneInstructor;
//# sourceMappingURL=courseInstructor.service.js.map