"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGrade = exports.findAndUpdate = exports.findOneGrade = exports.findGrade = exports.setGrade = void 0;
const grade_1 = __importDefault(require("../models/grade"));
function setGrade(input) {
    return grade_1.default.create(input);
}
exports.setGrade = setGrade;
function findGrade(query, options) {
    return grade_1.default.find(query, {}, options);
}
exports.findGrade = findGrade;
function findOneGrade(query, options) {
    return grade_1.default.findOne(query, {}, options);
}
exports.findOneGrade = findOneGrade;
function findAndUpdate(query, update, options) {
    return grade_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
function deleteGrade(query) {
    return grade_1.default.deleteOne(query);
}
exports.deleteGrade = deleteGrade;
//# sourceMappingURL=grade.service.js.map