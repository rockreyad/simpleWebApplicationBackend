"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gradeSchmea = new mongoose_1.Schema({
    student: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'Student',
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    courseInstructor: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'CourseInstructor',
        required: true
    }
});
const GradeModel = (0, mongoose_1.model)('Grade', gradeSchmea);
exports.default = GradeModel;
//# sourceMappingURL=grade.js.map