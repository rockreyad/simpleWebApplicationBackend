"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchmea = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        default: null
    },
    depId: {
        type: mongoose_1.SchemaTypes.ObjectId,
        default: null
    },
    credit: Number
});
const StudentModel = (0, mongoose_1.model)('Student', studentSchmea);
exports.default = StudentModel;
//# sourceMappingURL=student.js.map