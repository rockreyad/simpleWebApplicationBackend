"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enrollSchema = new mongoose_1.Schema({
    instructor: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'CourseInstructor',
        required: true
    },
    student: [
        {
            _id: false,
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'Student'
        }
    ]
}, { timestamps: true });
const EnrollModel = (0, mongoose_1.model)('Enroll', enrollSchema);
exports.default = EnrollModel;
//# sourceMappingURL=enroll.js.map