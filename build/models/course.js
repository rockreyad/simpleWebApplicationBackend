"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    name: String,
    code: String,
    credit: Number
});
const CourseModel = (0, mongoose_1.model)('Course', courseSchema);
exports.default = CourseModel;
//# sourceMappingURL=course.js.map