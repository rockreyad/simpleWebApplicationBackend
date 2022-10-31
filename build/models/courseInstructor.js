"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseInstructorSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'Course'
    },
    teacher: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'Teacher'
    }
});
const CourseInstructorModel = (0, mongoose_1.model)('CourseInstructor', courseInstructorSchema);
exports.default = CourseInstructorModel;
//# sourceMappingURL=courseInstructor.js.map