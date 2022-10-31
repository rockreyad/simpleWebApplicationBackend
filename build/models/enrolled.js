"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enrollSchema = new mongoose_1.Schema({
    students: [
        {
            _id: false,
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: 'Stduent'
        }
    ]
});
const EnrollModel = (0, mongoose_1.model)('Enroll');
//# sourceMappingURL=enrolled.js.map